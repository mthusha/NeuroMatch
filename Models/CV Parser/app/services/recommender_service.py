import pickle
import numpy as np

model_path = "ml/recommend_model.pkl"
encoder_path = "ml/skill_encoder.pkl"

model = pickle.load(open(model_path, "rb"))
mlb = pickle.load(open(encoder_path, "rb"))

def predict_recommendation(user_skills: list, job_skills: list):
    try:
        user_skills = [s.strip().lower() for s in user_skills]
        job_skills = [s.strip().lower() for s in job_skills]

        u_vec = mlb.transform([user_skills])[0]
        j_vec = mlb.transform([job_skills])[0]

        overlap = np.sum(u_vec & j_vec)
        union = np.sum(u_vec | j_vec)
        jaccard = overlap / union if union > 0 else 0

        match_score = len(set(user_skills) & set(job_skills)) / len(set(job_skills)) if job_skills else 0

        extra_features = np.array([[overlap, jaccard, match_score]])
        x_input = np.hstack((u_vec.reshape(1, -1), j_vec.reshape(1, -1), extra_features))

        prediction = model.predict(x_input)[0]
        confidence = model.predict_proba(x_input)[0][1]

        return {
            "recommended": bool(prediction),
            "confidence": round(confidence * 100, 2)
        }

    except Exception as e:
        return {"error": str(e)}

