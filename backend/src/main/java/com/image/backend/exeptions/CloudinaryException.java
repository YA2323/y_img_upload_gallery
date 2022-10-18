package com.image.backend.exeptions;

public class CloudinaryException extends RuntimeException {
    public CloudinaryException() {
        super("Cloudinary has thrown a Exception.");
    }
}