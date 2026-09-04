import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Home() {

    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {

        const loadProducts = async () => {

            try {

                const response =
                    await api.get("/products");

                setProducts(response.data);

            } catch (error) {

                if (error.response?.status === 401) {

                    localStorage.removeItem("token");

                    navigate("/login");
                }
            }
        };

        loadProducts();

    }, [navigate]);

    const logout = () => {

        localStorage.removeItem("token");

        navigate("/login");
    };

    return (
        <div>

            <nav className="navbar">

                <h2>Product Store</h2>

                <button onClick={logout}>
                    Logout
                </button>

            </nav>

            <h1 className="title">
                Products
            </h1>

            <div className="products">

                {products.map((product) => (

                    <div
                        className="product-card"
                        key={product.id}
                    >

                        <img
                            src={`http://localhost:8080${product.image}`}
                            alt={product.name}
                        />

                        <h2>{product.name}</h2>

                        <p>{product.description}</p>

                        <h3>
                            ₹{product.price}
                        </h3>

                        <span>
                            {product.category}
                        </span>

                    </div>

                ))}

            </div>

        </div>
    );
}

export default Home;