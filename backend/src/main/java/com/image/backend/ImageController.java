package com.image.backend;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/image")
public class ImageController {

    private final ImageService imageService;

    public ImageController(ImageService imageService) {
        this.imageService = imageService;
    }

    @PostMapping
    public ResponseEntity<?> imageUpload(@RequestParam("file") MultipartFile file) {
        return new ResponseEntity<>(imageService.uploadImage(file), HttpStatus.CREATED);
    }

    @GetMapping
    List<Image> getAllImages() {
        return imageService.getAllImages();
    }
}
