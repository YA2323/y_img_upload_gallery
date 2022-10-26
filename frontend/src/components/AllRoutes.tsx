import {Route, Routes} from "react-router-dom";
import Details from "./Details";
import ImageGallery from "./ImageGallery";
import useImages from "./useImages";

export default function AllRoutes() {


    const imgHook = useImages();

    return (
        <>
            <Routes>
                <Route path={"/"} element={<ImageGallery/>}/>
                <Route path={"/img/:id"} element={<Details img={imgHook.images} getOneImage={imgHook.getOneImage}/>}/>
            </Routes>
        </>
    )
}
