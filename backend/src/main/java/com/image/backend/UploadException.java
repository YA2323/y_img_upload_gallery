package com.image.backend;

public class UploadException extends RuntimeException {
    public UploadException(String originalFileName) {
        super(originalFileName + " konnte nicht hochgeladen werden!");
    }
}

