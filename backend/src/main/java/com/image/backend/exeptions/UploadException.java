package com.image.backend.exeptions;

public class UploadException extends RuntimeException {
    public UploadException(String originalFileName) {
        super(originalFileName + " konnte nicht hochgeladen werden!");
    }
}

