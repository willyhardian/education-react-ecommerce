import { createContext } from "react";
import { useEffect, useState } from "react";
import axios from "axios";
export const ProductContext = createContext({
    products: [],
    setProducts: () => {},
});

export function ProductContextProvider({ children }) {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        async function fetchProducts() {
            const response = await axios.get(
                import.meta.env.VITE_BASE_URL + "/products?category=2",
                {
                    headers: {
                        Authorization:
                            "Bearer " + localStorage.getItem("access_token"),
                    },
                }
            );
            console.log(response, "< response");
            setProducts(response.data.rows);
            const products = response.data.rows;
            console.log(products, "< products");
        }
        fetchProducts();
    }, []);
    return (
        <ProductContext.Provider value={{ products, setProducts }}>
            {children}
        </ProductContext.Provider>
    );
}
