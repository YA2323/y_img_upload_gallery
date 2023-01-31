package com.image.backend;

import com.cloudinary.Cloudinary;
import com.cloudinary.Uploader;
import com.cloudinary.utils.ObjectUtils;
import org.junit.jupiter.api.Test;

import java.io.File;
import java.io.IOException;
import java.util.*;


import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;
import static org.mockito.Mockito.verify;

class ImageServiceTest {

    private final Cloudinary cloudinary = mock(Cloudinary.class);
    ImageRepo imageRepo = mock(ImageRepo.class);

    ImageService imageService = new ImageService(imageRepo, cloudinary);
    private final Uploader uploader = mock(Uploader.class);

    List<com.image.backend.Tag> tags = new ArrayList<>();


    @Test
    void getAllImages() {

        tags.add(new com.image.backend.Tag("TEST"));

        List<Image> images = List.of(
                new Image("1", "11", "xyz.com", "Test1", "png", tags),
                new Image("2", "22", "xyz.de", "Test2", "jpg", tags)
        );
        when(imageRepo.findAll()).thenReturn(images);


        List<Image> actual = imageService.getAllImages();

        List<Image> expected = List.of(
                new Image("1", "11", "xyz.com", "Test1", "png", tags),
                new Image("2", "22", "xyz.de", "Test2", "jpg", tags)
        );

        assertThat(actual).hasSameElementsAs(expected);
    }

    @Test
    void getOneImage() {
        tags.add(new Tag("TEST"));
        Image oneImage = new Image("1", "11", "xyz.com", "Test1", "png", tags);

        when(imageRepo.findById("1")).thenReturn(Optional.of(oneImage));

        Optional<Image> actual = imageService.getOneImage("1");
        Optional<Image> expected = Optional.of(new Image("1", "11", "xyz.com", "Test1", "png", tags));

        assertThat(actual).isEqualTo(expected);
    }

    @Test
    void uploadImage() throws IOException {
        tags.add(new com.image.backend.Tag("TEST"));

        File file = new File(Objects.requireNonNull(this.getClass().getClassLoader().getResource("Michael_jordan.png")).getFile());
        System.out.println(file);
        when(cloudinary.uploader()).thenReturn(uploader);
        when(uploader.upload(file, ObjectUtils.emptyMap())).thenReturn(Map.of("2", "22", "xyz.de", "Test2", "png", tags));

        Map<String, String> actual = cloudinary.uploader().upload(file, ObjectUtils.emptyMap());
        assertThat(actual).isEqualTo(Map.of("2", "22", "xyz.de", "Test2", "png", tags));
    }


    @Test
    void updateImageWithTag() {
        tags.add(new Tag("TEST"));
        Image oneImage = new Image("1", "11", "xyz.com", "Test1", "png", tags);

        when(imageRepo.existsById(oneImage.id())).thenReturn(true);

        when(imageRepo.save(any(Image.class)))
                .thenReturn(oneImage);

        Image actual = imageService.updateImageWithTag(oneImage);

        assertThat(actual).isEqualTo(oneImage);
    }

    @Test
    void deleteImageInRepo() {
        tags.add(new Tag("TEST"));
        Image oneImage = new Image("1", "11", "xyz.com", "Test1", "png", tags);

        when(imageRepo.existsById(oneImage.id())).thenReturn(true);
        doNothing().when(imageRepo).deleteById(oneImage.id());

        imageService.deleteImageInRepo(oneImage.id());
        verify(imageRepo).deleteById(oneImage.id());
    }
}
