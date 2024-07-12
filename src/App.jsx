// import './App.css'
import {
    createBrowserRouter,
    redirect,
    RouterProvider,
} from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Login from "./pages/Login";
import Seller from "./pages/Seller";
import Logout from "./pages/Logout";
import { ProductContext } from "./store/fetch-product-context";
import { useEffect, useState } from "react";
import axios from "axios";
const router = createBrowserRouter([
    {
        path: "/login/seller",
        element: <Login />,
        loader: () => {
            const token = localStorage.getItem("access_token");
            if (token) {
                try {
                    const decoded = jwtDecode(token);
                    console.log(decoded, "< decoded");
                    return redirect("/seller");
                } catch (err) {
                    console.log(err, "< error dari jwt decode");
                    return null;
                }
            } else {
                return null;
            }
        },
    },
    {
        path: "/seller",
        element: <Seller />,
        loader: () => {
            const token = localStorage.getItem("access_token");
            // const redirectUrl =
            //     "/login/seller?errorMsg=You must be logged in to access the page";
            const redirectUrl = "/login/seller";
            if (!token) {
                sessionStorage.setItem(
                    "errorMsg",
                    "You must be logged in to access the page"
                );
                return redirect(redirectUrl);
            } else {
                try {
                    const decoded = jwtDecode(token);
                    console.log(decoded, "< decoded");
                    return null;
                } catch (err) {
                    console.log(err, "< error dari jwt decode");
                    sessionStorage.setItem(
                        "errorMsg",
                        "You must be logged in to access the page"
                    );
                    return redirect(redirectUrl);
                }
            }
        },
    },
    {
        path: "/logout",
        element: <Logout />,
        // loader: () => {
        //     const token = localStorage.getItem("access_token");
        //     if (token) {
        //         localStorage.removeItem("access_token");
        //         // return redirect("/login/seller");
        //     }
        //     return redirect("/login/seller");
        // },
    },
]);

function App() {
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
            <RouterProvider router={router} />;
        </ProductContext.Provider>
    );
}

export default App;
