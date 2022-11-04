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
    private final Cloudinary cloudinary;

    public ImageService(ImageRepo imageRepo, Cloudinary cloudinary) {
        this.imageRepo = imageRepo;
        this.cloudinary = cloudinary;
    }

    public List<Image> getAllImages() {
        return imageRepo.findAll();
    }

    public Optional<Image> getOneImage(String id) {
        return imageRepo.findById(id);
    }

    public Image uploadImage(MultipartFile file) {
        try {
            File newFile = File.createTempFile(Objects.requireNonNull(file.getOriginalFilename()), null);
            file.transferTo(newFile);
            var result = cloudinary.uploader().upload(newFile, ObjectUtils.emptyMap());
            String id = UUID.randomUUID().toString();
            String publicID = (String) result.get("public_id");
            String url = (String) result.get("url");
            String name = file.getOriginalFilename();
            String type = file.getContentType();
            List<Tag> tags = new ArrayList<>();
            return imageRepo.save(new Image(id, publicID, url, name, type, tags));
        } catch (IOException e) {
            throw new UploadException(file.getOriginalFilename());
        }
    }

    public Image updateImageWithTag(Image newImage) {

        imageRepo.deleteById(newImage.id());
        imageRepo.save(newImage);
        return newImage;
    }


    public boolean deleteImageInRepo(String id) {
        if (imageRepo.existsById(id)) {
            imageRepo.deleteById(id);
            return true;
        }
        return false;
    }

    public void deleteImageInCloud(String id) {
        try {
            cloudinary.uploader().destroy(id, ObjectUtils.emptyMap());
        } catch (Exception e) {
            throw new CloudinaryException();
        }
    }
}
