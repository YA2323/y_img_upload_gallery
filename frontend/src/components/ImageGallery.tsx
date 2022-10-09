import useImages from "./useImages";
import "./style/ImageGallery.css"

export default function ImageGallery() {

    const {addImage, images, formData} = useImages()

    const onFileChanged = (event: any) => {
        if (event.target && event.target.files[0]) {
            formData.append("file", event.target.files[0])
        }
    }

    const SubmitFileData = () => {
        addImage()
            .then(console.log)
    }

    const getImages = images.map((e) => {

        return (
            <div className={"img"} key={e.id}>
                <img height={250} width={220} alt={"sample"}
                     src={e.url}></img>
                <p>{e.name}</p>
            </div>
        )
    })

    return (
        <div className="Image_Upload">

            <div className="Image_Uploading">
                <input type={"file"} name={"upload_file"} accept={"image/*"} onChange={onFileChanged}/>
                <button onClick={SubmitFileData}>Submit</button>
            </div>

            <div className={"images"}>
                    {getImages}
            </div>

        </div>
    )

}
