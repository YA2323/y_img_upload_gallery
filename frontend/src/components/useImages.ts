import {useEffect, useState} from "react";
import axios from "axios";
import {Image} from "./Image";

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

    return {addImage, images, formData}
}