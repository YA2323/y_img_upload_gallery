import {useEffect, useState} from "react";
import axios from "axios";
import {Image} from "./Image";
import {toast} from "react-toastify";
import {Tag} from "./Tag";


export default function useImages() {

    let formData = new FormData()
    const [images, setImages] = useState<Image[]>([])

    useEffect(() => {
        getAllImages()
    }, [])

    const getAllImages = () => {
        axios.get("/image")
            .then((response) => response.data)
            .then(setImages)
    }

    const addImage = () => {
        return axios.post("/image", formData)
            .then((response) =>
                console.log(response))
            .catch((error) =>
                console.log(error))
            .then(getAllImages)
    }

    const onErrorFunction = (error: Error) => {
        toast.error(error.message, {
                position: toast.POSITION.TOP_LEFT
            }
        )
    }

    const deleteImageInCloud = (id: string) => {
        return axios.delete(`/image/cloud/${id}`)
            .then(getAllImages)
            .catch(
                error => {
                    onErrorFunction(error)
                })
    }

    const deleteImageInRepo = (id: string) => {
        return axios.delete(`/image/repo/${id}`)
            .then(getAllImages)
            .catch(
                error => {
                    onErrorFunction(error)
                })
    }


    const imageWithTags = (img: Image, tag: string) => {
        const newTag: Tag = {
            tag: tag
        }

        const newImageWithTags: Image = {
            id: img.id,
            publicId: img.publicId,
            url: img.url,
            name: img.name,
            type: img.type,
            tags: img.tags.concat(newTag)
        }
        return axios.put(`image/tag/${img.id}`, newImageWithTags)//{newImageWithTags, tag}
            .then(getAllImages)
            .catch(error => {
                onErrorFunction(error)
            })
    }

    const getOneImage = (id: string) => {
        return axios.get(`image/details/${id}`)
            .then(response => response.data)
    }

    return {
        addImage,
        images,
        formData,
        deleteImageInCloud,
        deleteImageInRepo,
        imageWithTags,
        getOneImage,
        onErrorFunction,
    }
}
