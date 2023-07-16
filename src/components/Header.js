import React, { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
    SearchSelect,
    SearchSelectItem,
    Select,
    SelectItem,
} from "@tremor/react";
import { Link, useNavigate } from "react-router-dom";
import { useProductStore } from "../store/ProductStore";
import logo from "../img/logo.jpeg";

const SORT_BY_MAP = {
    r: "Default",
    rv: "By review",
    p: "By price (low to high)",
    pd: "By price (high to low)",
};

function Header() {
    const navigate = useNavigate();
    const [handelSubmitProduct, loading] = useProductStore((state) => [
        state.handelSubmitProduct,
        state.loading,
    ]);

    const [nameProduct, setNameProduct] = useState("");
    const [pages, setPages] = useState("");
    const [sort, setSort] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");

    const handleSubmitForm = async () => {
        const params = new URLSearchParams();
        if (nameProduct.trim().length > 0)
            params.set("nameProduct", nameProduct);
        else return;
        if (pages.trim().length > 0) params.set("pages", pages);
        if (sort.trim().length > 0) params.set("sort", sort);
        if (minPrice.trim().length > 0) params.set("minPrice", minPrice);
        if (maxPrice.trim().length > 0) params.set("maxPrice", maxPrice);
        navigate(`/search?${params.toString()}`);
        const productInfo = {
            nameProduct,
            pages,
            sort,
            minPrice,
            maxPrice,
        };
        await handelSubmitProduct(productInfo);
    };
    return (
        <header
            className="flex flex-col items-center justify-center md:flex-row md:items-start
          md:space-x-6 px-2 py-5 md:px-10 min-w-full"
        >
            <Link
                className="w-20 h-20 rounded-full border border-solid border-slate-600 hover:opacity-80"
                to="/"
            >
                <img
                    className="object-contain rounded-full"
                    src={logo}
                    alt="logo"
                />
            </Link>
            <form action="#" className="flex-1">
                <div className="min-w-full flex justify-center items-center gap-2">
                    <div
                        className="flex items-center space-x-2 bg-white
            shadow-xl rounded-tremor-full border-0 px-6 py-4 md:max-w-6xl"
                    >
                        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                        <input
                            type="text"
                            value={nameProduct}
                            onChange={(e) => setNameProduct(e.target.value)}
                            placeholder="Search..."
                            className="outline-none flex-1"
                            required
                        />
                    </div>
                    <button
                        disabled={loading}
                        type="button"
                        onClick={handleSubmitForm}
                        className="bg-blue-700 text-white font-bold p-2 rounded-full
              disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-80"
                    >
                        {loading ? (
                            <span className="text-white text-xs">
                                Searching...
                            </span>
                        ) : (
                            <MagnifyingGlassIcon className="h-5 w-5 text-white" />
                        )}
                    </button>
                </div>
                <div
                    className="w-full grid grid-cols-2 gap-2 mb-4 mt-6 md:grid-cols-4
                    max-w-lg md:max-w-none mx-auto items-center"
                >
                    <SearchSelect
                        className="min-w-4"
                        placeholder="# of pages"
                        onValueChange={(value) => setPages(value)}
                    >
                        {[...Array(100)].map((_, i) => (
                            <SearchSelectItem
                                key={i}
                                value={(i + 1).toString()}
                            >
                                {(i + 1).toString()} pages
                            </SearchSelectItem>
                        ))}
                    </SearchSelect>

                    <Select
                        className="min-w-4"
                        placeholder="Sort"
                        onValueChange={(value) => setSort(value)}
                    >
                        {Object.entries(SORT_BY_MAP).map(([key, value]) => (
                            <SelectItem key={key} value={key}>
                                {value}
                            </SelectItem>
                        ))}
                    </Select>

                    <SearchSelect
                        className="min-w-4"
                        placeholder="Min Price..."
                        onValueChange={(value) => setMinPrice(value)}
                    >
                        {["", "100", "250", "500", "750", "900", "1000+"].map(
                            (_, i) => (
                                <SearchSelectItem key={i} value={_.toString()}>
                                    {i === 0
                                        ? "No Minimun"
                                        : `$${_.toString()}`}
                                </SearchSelectItem>
                            )
                        )}
                    </SearchSelect>

                    <SearchSelect
                        className="min-w-4"
                        placeholder="Max Price..."
                        onValueChange={(value) => setMaxPrice(value)}
                    >
                        {["", "100", "250", "500", "750", "900", "1000+"].map(
                            (_, i) => (
                                <SearchSelectItem key={i} value={_.toString()}>
                                    {i === 0
                                        ? "No Maximun"
                                        : `$${_.toString()}`}
                                </SearchSelectItem>
                            )
                        )}
                    </SearchSelect>
                </div>
            </form>
        </header>
    );
}

export default Header;
