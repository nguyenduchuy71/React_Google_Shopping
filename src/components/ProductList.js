import React from "react";
import LoadingPage from "./LoadingPage";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/ProductStore";

function ProductList({ productList }) {
    const [productName, loading] = useProductStore((state) => [
        state.productName,
        state.loading,
    ]);
    return (
        <div>
            {!loading ? (
                <div className="flex">
                    <div className="max-h-screen md:px-4">
                        {productList?.map((product) => (
                            <div key={product.job_id} className="space-y-2">
                                {product.content.results.filters?.map(
                                    (filter, i) => (
                                        <div
                                            key={i}
                                            className="border rounded-lg md:rounded-lg p-4"
                                        >
                                            <p className="font-bold">
                                                {filter.name}
                                            </p>
                                            <div className="flex flex-col">
                                                {filter.values.map((value) => (
                                                    <p className="hover: text-blue-500">
                                                        {value.value}
                                                    </p>
                                                ))}
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-col md:p-5 md:pt-0 space-y-5">
                        {productList?.map((pageResult, i) => (
                            <div
                                key={pageResult.job_id}
                                className="min-w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3"
                            >
                                {i !== 0 && <hr className="col-span-full" />}
                                <div className="md:col-span-2 lg:col-span-3 xl:col-span-4">
                                    <div className="flex space-x-2 items-center divide-x-2">
                                        <h1>Shop On Google</h1>
                                        <h2 className="tex-xl font-semibold pl-2">
                                            Search results for page {i + 1}
                                        </h2>
                                    </div>
                                    {productName && (
                                        <h3 className="font-extralight">
                                            Showing results for {productName}
                                        </h3>
                                    )}
                                </div>

                                {pageResult.content?.results?.organic?.map(
                                    (item) => (
                                        <Link
                                            key={item.pos}
                                            to={
                                                item.url.includes("url?url=")
                                                    ? `${
                                                          item.url.split(
                                                              "url?url="
                                                          )?.[1]
                                                      }`
                                                    : `${
                                                          item.url.split(
                                                              "url?url="
                                                          )?.[0]
                                                      }`
                                            }
                                            className={`border rounded-2xl flex flex-col hover:shadow-lg transition duration-200 ease-in-out ${
                                                item.url.includes("url?url=") &&
                                                "italic"
                                            }`}
                                        >
                                            <div className="border-b p-5 flex-1">
                                                <p>{item.title}</p>
                                            </div>
                                            <div className="px-5 py-2 not-italic h-18">
                                                <p className="font-light">
                                                    {item.price_str}{" "}
                                                    {item.currency}
                                                </p>
                                                <p className="text-[#1B66D2] font-semibold truncate">
                                                    {item.merchant.name}
                                                </p>
                                            </div>
                                        </Link>
                                    )
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <LoadingPage />
            )}
        </div>
    );
}

export default ProductList;
