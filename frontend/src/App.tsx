import './App.css';
import Header from "./components/Header";
import {HashRouter} from "react-router-dom";
import AllRoutes from "./components/AllRoutes";

function App() {

    return (
        <div className="App">
            <HashRouter>
                <Header/>
                <main>
                    <AllRoutes/>
                </main>
            </HashRouter>
        </div>
    );
}

export default App;
