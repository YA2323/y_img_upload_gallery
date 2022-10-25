import {Image} from "./Image";
import {useNavigate, useParams} from "react-router-dom";
import React, {useState} from "react";
import useImages from "./useImages";
import "../style/Details.css"

type imgProps = {
    img: Image[]
}

export default function Details(props: imgProps) {

    const navigate = useNavigate();
    const {imageWithTags} = useImages();
    const [oneTag, setOneTag] = useState("")

    const {id} = useParams();
    const imageToUpdate = props.img.find(item => item.id === id);
    if (!imageToUpdate) {
        return <>
            Image not found</>
    }

    return (

        <>
            <h1>DETAILS PAGE</h1>
            <div className={"imgDetails"}>
                <ul className={"listDetails"}>
                    <li id={"list"}>Original Name: {imageToUpdate.name}</li>
                    <li id={"list"}>Link: <a href={imageToUpdate.url.toString()}>{imageToUpdate.url}</a></li>
                    <li id={"list"}>Data Type: {imageToUpdate.type}</li>
                    <li id={"list"}>ID MongoDB: {imageToUpdate.id}</li>
                    <li id={"list"}>ID Cloudinary: {imageToUpdate.publicId}</li>
                </ul>
            </div>
            <div className={"img"}>
                <img height={520} width={490} alt={"sample"}
                     src={imageToUpdate.url}></img>
                <div className={"tag"}>
                    <input type={"input"} value={oneTag}
                           onChange={event => setOneTag(event.target.value)}/>
                    <button onClick={() => imageWithTags(imageToUpdate, oneTag)}>Add Tag</button>
                </div>
                <p>TAG: {imageToUpdate.tags}</p>
            </div>
            <button id={"home"} onClick={() => {
                navigate(`/`)
            }}>HOME
            </button>
        </>
    )
}
