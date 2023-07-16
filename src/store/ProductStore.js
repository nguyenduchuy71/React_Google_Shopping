import { create } from "zustand";
import { getGoogleProductResult, getGoogleProductById } from "../api/route";

export const useProductStore = create((set, get) => ({
    listProduct: [],
    productName: "",
    minPrice: "",
    maxPrice: "",
    sortBy: "r",
    pages: 1,
    productData: [],
    searchInfo: {},
    productId: "",
    loading: false,
    handelSubmitProduct: async (productInfo) => {
        let loading = true;
        set({ loading });
        if (JSON.stringify(productInfo) === JSON.stringify(get().searchInfo)) {
            setTimeout(() => {
                loading = false;
                set({ loading });
            }, 200);
        } else {
            const productName = productInfo.productName;
            const minPrice = productInfo.minPrice;
            const maxPrice = productInfo.maxPrice;
            const sortBy = productInfo.sort;
            const pages = productInfo.pages;
            const searchInfo = productInfo;
            set({ searchInfo });
            set({ productName });
            set({ minPrice });
            set({ maxPrice });
            set({ sortBy });
            set({ pages });
            const res = await getGoogleProductResult(get().searchInfo);
            const list_product = res?.results;
            if (list_product) {
                loading = false;
                set({ loading });
                set({ list_product });
            }
        }
    },
    getProductById: async (id) => {
        let loading = true;
        set({ loading });
        if (get().productId === id) {
            setTimeout(() => {
                loading = false;
                set({ loading });
            }, 200);
        } else {
            const res = await getGoogleProductById(id);
            const productData = res?.results[0];
            const productId = id;
            loading = false;
            set({ loading });
            set({ productData });
            set({ productId });
        }
    },
}));
