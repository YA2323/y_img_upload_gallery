import {Image} from "./Image";
import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import useImages from "./useImages";
import "../style/Details.css"

type imgProps = {
    img: Image[]
    getOneImage: (id: string) => Promise<Image>
}

export default function Details(props: imgProps) {

    const navigate = useNavigate();
    const {imageWithTags, onErrorFunction} = useImages();
    const [oneTag, setOneTag] = useState("")
    const [imageToUpdate, setImageToUpdate] = useState<Image>();
    const {id} = useParams();

    useEffect(() => {
        if (id) {
            props.getOneImage(id)
                .then(e => setImageToUpdate(e))
                .catch(error => {
                    onErrorFunction(error)
                });
        }
    }, [id, onErrorFunction, props])


    const handleClick = () => {
        if (imageToUpdate)
            imageWithTags(imageToUpdate, oneTag)
                .then(console.log)
        setOneTag("")
    }

    return (

        <div className={"detailsPage"}>
            <h1>DETAILS PAGE</h1>
            <div className={"imgDetails"}>
                <ul className={"listDetails"}>
                    <li id={"list"}>Original Name: {imageToUpdate?.name}</li>
                    <li id={"list"}>Link: <a href={imageToUpdate?.url.toString()}>{imageToUpdate?.url}</a></li>
                    <li id={"list"}>Data Type: {imageToUpdate?.type}</li>
                    <li id={"list"}>ID MongoDB: {imageToUpdate?.id}</li>
                    <li id={"list"}>ID Cloudinary: {imageToUpdate?.publicId}</li>
                </ul>
            </div>
            <div className={"img"}>
                <img height={520} width={490} alt={"sample"}
                     src={imageToUpdate?.url}></img>
                <div className={"tag"}>
                    <input type={"input"} value={oneTag}
                           onChange={event => setOneTag(event.target.value)}/>
                    <button onClick={handleClick}>Add Tag</button>
                </div>
                <p id={"t"}>{imageToUpdate?.tags.map((i) => (<li>
                    <button id={"tagsBtn"}>{i.tag}</button>
                </li>))}</p>
            </div>
            <button id={"home"} onClick={() => {
                navigate(`/`)
            }}>HOME
            </button>
        </div>
    )
}
