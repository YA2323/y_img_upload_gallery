package com.image.backend.exeptions;

public class ImageNotFoundException extends RuntimeException {
    public ImageNotFoundException() {
        super("Image not found.");
    }
}