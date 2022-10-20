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

    const imageWithDescr = (img: Image, tag: Tag) => {
        const newAnimalWithPosition: Image = {
            id: img.id,
            publicId: img.publicId,
            url: img.url,
            name: img.name,
            type: img.type,
            tag: tag
        }
        return axios.put(`image/tag/${img.id}`, newAnimalWithPosition)
            .catch(error => {
                onErrorFunction(error)
            })
    }

    return {addImage, images, formData, deleteImageInCloud, deleteImageInRepo, imageWithDescr}
}
