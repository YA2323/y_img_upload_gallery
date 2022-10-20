package com.image.backend;


public record Image(String id, String publicId, String url, String name, String type, Tag tag) {
}
