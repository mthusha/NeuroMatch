package com.NeuroMatch.NeuroMatch.util;

public class EndpointBundle {
    public static final String BASE_URL = "api/v1";
    public static final String DELETE = "/delete";

    // Auth
    public static final String AUTH = BASE_URL + "/auth";
    public static final String REGISTER = "/register";
    public static final String LOGOUT = "/logout";
    public static final String GOOGLE = "/google";
    public static final String LOGIN = "/login";

    //User
    public static final String USER = BASE_URL + "/user";
    public static final String UPLOAD_IMAGE = "/upload-image";


    //JobPost
    public static final String JOB_POST = BASE_URL + "/job-post";
    public static final String GET_JOBS_POST_BY_COMPANY = "/company/{id}/job-posts";
    public static final String CV = "/cv";

    //jobSeeker
    public static final String JOB_SEEKER = BASE_URL + "/job-seeker";
    public static final String SAVE_CV = "/cv/save";
    public static final String RECOMMENDED_JOB_SEEKERS = "/recommend/job-seekers";
    public static final String INTERVIEW_QUESTIONS = "/interview/generate_questions";
    public static final String INTERVIEW_ANSWERS = "/answer";
    public static final String FOLLOW = "/follow";
    public static final String LIKE = "/like";
    public static final String JOB_SEEKER_SUMMERY = "/job-seeker-summery";
    public static final String GET_SCORE_ONLY = "/get-score-only";


    //utils
    public static final String CREATE = "/create";
    public static final String ID = "/{id}";
    public static final String EMAIL = "/{email}";
    public static final String name = "/{name}";

    //company
    public static final String COMPANY = BASE_URL + "/company";
    public static final String NOT_COMPANY_LIST = "/followed-list";
    public static final String RECOMMENDED_COMPANY_LIST = "/recommended";
    public static final String SEARCH_COMPANY = "/search";
    public static final String COMPANY_DASH = "/company/dashboard";
    public static final String GET_ID_BY_EMAIL = "id-by-email";

    //Applied Jobs
    public static final String APPLIED_JOBS = BASE_URL + "/applied-jobs";
    public static final String RECOMMENDED_APPLIED_JOBS = "/{jobPostId}/applicants";
    public static final String UPDATE_STATUS = "/status-update";
    public static final String APPLIED_UI = "/applied-uer-ui";
    public static final String APPLIED_TITLE = "/applied-title";
//    public static final String APPLIED_JOBS_GET = "/applied-jobs";

    // python server
    public static final String AI_CLIENT_URL_RECOMMEND = "http://localhost:5000/api/recommend/predict";
    public static final String AI_CLIENT_GENERAL_INTERVIEW = "http://localhost:5000/api/interview/general";
    public static final String AI_CLIENT_JOB_INTERVIEW = "http://localhost:5000/api/interview/job-specific";
    public static final String AI_CLIENT_ANSWER = "http://localhost:5000/api/interview/answer";

    // Interview Session
    public static final String INTERVIEW_SESSION = BASE_URL + "/interview-session";
    public static final String GET_INTERVIEW_BY_APPLICANT = "/by-applicant";
    public static final String VIDEO_UPLOAD = "/upload-video";
    public static final String GET_VIDEO = "/interview-video/{jobId}";

    //SCHEDULE_ASSESSMENT
    public static final String SCHEDULE_ASSESSMENT = BASE_URL + "/schedule-assessment";
    public static final String GET_SCHEDULE_COUNT = "/count";
    public static final String COMPLETE_ASSESSMENT = "/complete-assessment";

}
