import './App.css';
import useImages from "./components/useImages";

function App() {

    const {addImage, images, formData} = useImages()

    const onFileChanged = (event: any) => {
        if (event.target && event.target.files[0]) {
            formData.append("file", event.target.files[0])
        }
    }

    const SubmitFileData = () => {
        addImage()
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

