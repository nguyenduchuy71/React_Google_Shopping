import axios from "axios";

const SERVER_URL = "https://flask-google-shopping.vercel.app";

export const getGoogleProductResult = async (searchInfo) => {
    let list_product = {};
    await axios
        .post(`${SERVER_URL}/get_product`, JSON.stringify(searchInfo), {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
        })
        .then((response) => {
            console.log("Success ========>", response);
            list_product = response?.data?.list_product;
        })
        .catch((error) => {
            console.log("Error ========>", error);
        });
    return list_product;
};

export const getGoogleProductById = async (id) => {
    let product = {};
    await axios
        .get(`${SERVER_URL}/get_product/${id}`, {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
        })
        .then((response) => {
            console.log("Success ========>", response);
            product = response?.data?.product;
        })
        .catch((error) => {
            console.log("Error ========>", error);
        });
    return product;
};
