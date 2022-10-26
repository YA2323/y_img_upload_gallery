package com.image.backend;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

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


    @GetMapping("details/{id}")
    public Optional<Image> getOneImage(@PathVariable String id) {
        return imageService.getOneImage(id);
    }

    @DeleteMapping("repo/{id}")
    public ResponseEntity<Void> deleteImageInRepo(@PathVariable String id) {
        boolean deleteSuccess = imageService.deleteImageInRepo(id);
        return new ResponseEntity<>(deleteSuccess ? HttpStatus.NO_CONTENT : HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("cloud/{id}")
    public ResponseEntity<Void> deleteImageInCloud(@PathVariable String id) {
        try {
            imageService.deleteImageInCloud(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception exception) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("tag/{id}")
    public ResponseEntity<Image> updateImageWithTag(
            @RequestBody Image newImage) {
        Image updatedImage = imageService.updateImageWithTag(newImage);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(updatedImage);
    }
}
