import "./App.css";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import SearchPage from "./components/SearchPage";
import ProductPage from "./components/ProductPage";

function App() {
    return (
        <div className="max-w-screen h-screen p-4">
            <Header />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/search?" element={<SearchPage />} />
                <Route
                    path="/shopping/product/:id?"
                    element={<ProductPage />}
                />
            </Routes>
        </div>
    );
}

export default App;
