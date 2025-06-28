package com.NeuroMatch.NeuroMatch.model.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class UploadImageRequest {
    private String base64Image;
    private String email;
    private String type;
}

