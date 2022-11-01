package com.image.backend;

import com.cloudinary.Cloudinary;
import com.cloudinary.Uploader;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;


import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyMap;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.multipart;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@SpringBootTest
@AutoConfigureMockMvc
class ImageIntegrationTest {

    @Autowired
    MockMvc mockMvc;

    @MockBean
    private Cloudinary cloudinary;

    @MockBean
    private Uploader uploader;


    List<Tag> tags = new ArrayList<>();


    @DirtiesContext
    @Test
    void uploadImage() throws Exception {
        tags.add(new com.image.backend.Tag("TEST"));
        MockMultipartFile firstFile = new MockMultipartFile(
                "file", "Michael_Jordan.png",
                MediaType.TEXT_PLAIN_VALUE,
                "Test".getBytes());
        when(cloudinary.uploader()).thenReturn(uploader);
        when(uploader
                .upload(
                        any(File.class),
                        anyMap()
                )
        ).thenReturn(Map.of("1", "11", "xyz.com", "Test1", "png", tags));

        mockMvc.perform(multipart("/image").file(firstFile))
                .andExpect(status().isCreated());
    }
}
