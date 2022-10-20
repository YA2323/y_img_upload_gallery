import {Image} from "./Image";
import {useNavigate, useParams} from "react-router-dom";
import React, {useState} from "react";
import useImages from "./useImages";

type imgProps = {
    img: Image[]
}

export default function Details(props: imgProps) {

    const navigate = useNavigate();
    const {imageWithDescr} = useImages();
    const [oneTag, setOneTag] = useState("")

    const {id} = useParams();
    const imageToUpdate = props.img.find(item => item.id === id);
    if (!imageToUpdate) {
        return <>
            Animal not found</>
    }

    console.log("DIES ID : " + imageToUpdate)


    return (

        <div>
            <div>DETAILS</div>
            <div>{imageToUpdate.name}</div>
            <img height={450} width={420} alt={"sample"}
                 src={imageToUpdate.url}></img>
            <div>
                <input type={"input"} value={oneTag}
                       onChange={event => setOneTag(event.target.value)}/>
                <button onClick={() => imageWithDescr(imageToUpdate, {tag: oneTag})}>Add Tag</button>
            </div>
            <button onClick={() => {
                navigate(`/`)
            }}>HOME
            </button>
        </div>
    )
}
