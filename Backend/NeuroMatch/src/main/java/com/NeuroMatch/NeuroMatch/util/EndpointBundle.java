package com.NeuroMatch.NeuroMatch.util;

public class EndpointBundle {
    public static final String BASE_URL = "api/v1";

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

    //jobSeeker
    public static final String JOB_SEEKER = BASE_URL + "/job-seeker";
    public static final String SAVE_CV = "/cv/save";
    public static final String RECOMMENDED_JOB_SEEKERS = "/recommend/job-seekers";

    //utils
    public static final String CREATE = "/create";
    public static final String ID = "/{id}";
    public static final String EMAIL = "/{email}";

    //company
    public static final String COMPANY = BASE_URL + "/company";
    public static final String NOT_COMPANY_LIST = "/followed-list";
    public static final String RECOMMENDED_COMPANY_LIST = "/recommended";

    //Applied Jobs
    public static final String APPLIED_JOBS = BASE_URL + "/applied-jobs";
    public static final String RECOMMENDED_APPLIED_JOBS = "/{jobPostId}/applicants";

    // python server
    public static final String MLA_URL = "http://localhost:5000/api/recommend/predict";


}
