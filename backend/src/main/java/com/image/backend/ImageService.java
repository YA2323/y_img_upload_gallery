package com.image.backend;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

@Service
public class ImageService {

    private final ImageRepo imageRepo;

    public ImageService(ImageRepo imageRepo) {
        this.imageRepo = imageRepo;
    }

    Cloudinary cloudinary = new Cloudinary(ObjectUtils.asMap(
            "cloud_name", "daaat5oh4",
            "api_key", "793415223554377",
            "api_secret", "J4itukLEW52USY4_ZP28JS6lkNM",
            "secure", true));


    public Image uploadImage(MultipartFile file) {
        try {
            File newFile = File.createTempFile(Objects.requireNonNull(file.getOriginalFilename()), null);
            file.transferTo(newFile);
            var responseObj = cloudinary.uploader().upload(newFile, ObjectUtils.emptyMap());
            String id = UUID.randomUUID().toString();
            String url = (String) responseObj.get("url");
            String name = file.getOriginalFilename();
            String type = file.getContentType();
            return imageRepo.save(new Image(id, url, name, type));
        } catch (IOException e) {
            throw new UploadException(file.getOriginalFilename());
        }
    }

    public List<Image> getAllImages() {
        return imageRepo.findAll();
    }
}
