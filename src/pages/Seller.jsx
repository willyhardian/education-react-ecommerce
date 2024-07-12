import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
export default function Seller() {
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
            const products = response.data.rows;
            console.log(products, "< products");
        }
        fetchProducts();
    }, []);

    return (
        <>
            <Navbar />
            <div className="container mx-auto">
                <h1 className="font-bold text-3xl">Seller</h1>
            </div>
        </>
    );
}
