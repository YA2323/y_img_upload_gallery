import React, {useEffect, useState} from 'react';
import './App.css';
import axios from "axios";
import {Image} from "./components/Image";

function App() {

    const [images, setImages] = useState<Image[]>([])

    let formData = new FormData()

    useEffect(() => {
        getAll()
    }, [])

    const getAll = () => {
        axios.get("/image")
            .then((response) => response.data)
            .then(setImages)
    }

    const onFileChanged = (event: any) => {
        if (event.target && event.target.files[0]) {
            formData.append("file", event.target.files[0])
        }
    }

    const SubmitFileData = () => {
        axios.post("/image", formData)
            .then((response) =>
                console.log(response))
            .catch((error) =>
                console.log(error))
            .then(getAll)
    }

    return (
        <div className="App">
            <div>
                <input type={"file"} name={"upload_file"} onChange={onFileChanged}/>
            </div>
            <div>
                <button onClick={SubmitFileData}>Submit</button>
            </div>
            <div>{images.map((e) => <p><img key={e.id} height={200} width={180} alt={"sample"}
                                            src={e.url}></img>{e.name}</p>)}</div>
        </div>

    );
}

export default App;

