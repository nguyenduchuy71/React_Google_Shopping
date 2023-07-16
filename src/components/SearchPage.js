import React, { useEffect } from "react";
import { useProductStore } from "../store/ProductStore";
import ProductList from "./ProductList";

function SearchPage() {
    const [list_product] = useProductStore((state) => [state.list_product]);
    useEffect(() => {}, [list_product]);

    return <ProductList productList={list_product} />;
}

export default SearchPage;
