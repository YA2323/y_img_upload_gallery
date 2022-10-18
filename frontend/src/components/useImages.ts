import {useEffect, useState} from "react";
import axios from "axios";
import {Image} from "./Image";
import {toast} from "react-toastify";

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

    return {addImage, images, formData, deleteImageInCloud,deleteImageInRepo}
}