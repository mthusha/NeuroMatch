package com.NeuroMatch.NeuroMatch.util;

public class EndpointBundle {
    public static final String BASE_URL = "api/v1";

    // Auth
    public static final String AUTH = BASE_URL + "/auth";
    public static final String REGISTER = "/register";
    public static final String LOGOUT = "/logout";
    public static final String GOOGLE = "/google";

    //User
    public static final String USER = BASE_URL + "/user";
    public static final String EMAIL = "/{email}";
    public static final String UPLOAD_IMAGE = "/upload-image";
    public static final String SAVE_CV = "/cv/save";

}
