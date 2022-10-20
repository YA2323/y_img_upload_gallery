package com.image.backend;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.image.backend.exeptions.CloudinaryException;
import com.image.backend.exeptions.UploadException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.*;

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
            String publicID = (String) responseObj.get("public_id");
            String url = (String) responseObj.get("url");
            String name = file.getOriginalFilename();
            String type = file.getContentType();
            Tag tag = new Tag("");
            return imageRepo.save(new Image(id, publicID, url, name, type, tag));
        } catch (IOException e) {
            throw new UploadException(file.getOriginalFilename());
        }
    }

    public Image imageWithDescription(Image newImage) {

        imageRepo.deleteById(newImage.id());
        imageRepo.save(newImage);

        return newImage;
    }

    public List<Image> getAllImages() {
        return imageRepo.findAll();
    }


    public boolean deleteImageInRepo(String id) {
        if (imageRepo.existsById(id)) {
            imageRepo.deleteById(id);
            return true;
        }
        return false;
    }

    public Map deleteImageInCloud(String id) {
        try {
            return cloudinary.uploader().destroy(id, ObjectUtils.emptyMap());
        } catch (Exception e) {
            throw new CloudinaryException();
        }
    }

}
