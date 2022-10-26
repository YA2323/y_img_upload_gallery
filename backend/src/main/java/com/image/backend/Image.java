package com.image.backend;


import java.util.List;

public record Image(String id, String publicId, String url, String name, String type, List<String> tags) {
}
