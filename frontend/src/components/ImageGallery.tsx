import useImages from "./useImages";
import "../style/ImageGallery.css"
import React from "react";
import {useNavigate} from "react-router-dom";

export default function ImageGallery() {

    const {addImage, images, formData, deleteImageInCloud, deleteImageInRepo} = useImages()
    const navigate = useNavigate();

    const onFileChanged = (event: any) => {
        if (event.target && event.target.files[0]) {
            formData.append("file", event.target.files[0])
        }
    }

    const SubmitFileDataClick = () => {
        addImage()
            .then(console.log)
    }


    const DeleteImageClick = (idCloud: string, idRepo: string) => {
        return (event: React.MouseEvent) => {
            deleteImageInCloud(idCloud)
                .then(console.log)
            deleteImageInRepo(idRepo)
                .then(console.log)
            event.preventDefault();
        }
    }


    const getImages = images.map((e) => {

        return (
            <div className={"imgMap"} key={e.id}>
                <img className={"imgHover"} height={250} width={220} alt={"sample"}
                     src={e.url}></img>
                <button onClick={DeleteImageClick(e.publicId, e.id)}>Delete Image</button>
                <button onClick={() => {
                    navigate(`/img/${e.id}`)
                }}>Details
                </button>
                <p>{e.tags.map((i) => (<button >{i.tag}</button>))}</p>
            </div>
        )
    })

    return (
        <div className="Image_Upload">

            <div className="Uploading">
                <h2>UPLOAD A NEW IMAGE :</h2>
                <input type={"file"} name={"upload_file"} accept={"image/*"} onChange={onFileChanged}/>
                <button onClick={SubmitFileDataClick}>Submit</button>
            </div>

            <div className={"images"}>
                {getImages}
            </div>
        </div>
    )
}
