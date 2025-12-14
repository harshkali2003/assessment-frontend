import React, { useEffect, useState } from "react";
import "../../styles/HomePage.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function HomePage() {
  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user?.role === "admin";
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchProducts(query = "") {
    try {
      setLoading(true);

      const url = query
        ? `https://mithaighar.onrender.com/product/search?name=${query}`
        : `https://mithaighar.onrender.com/product/`;

      const { data } = await axios.get(url);

      if (data.message === "success") {
        setProducts(data.data);
      }
    } catch (err) {
      if (query) {
        setProducts([]);
      } else {
        toast.error("Failed to load products");
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchProducts(search.trim());
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    fetchProducts();
  }, []);

  function handleAdd() {
    navigate("/admin/add");
  }

  function handleEdit(id) {
    navigate(`/admin/edit/${id}`);
  }

  async function handleDelete(id) {
    const yes = window.confirm("Are you sure you want to delete this product?");
    if (!yes) return;

    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.delete(
        `https://mithaighar.onrender.com/product/delete/${id}`,
        {
          headers: { Authorization: token },
        }
      );

      if (data.message === "success") {
        toast.success("Product deleted");
        fetchProducts(search);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Delete failed");
    }
  }

  function handleIncrease(productId) {
    navigate(`/admin/stock/increase/${productId}`);
  }

  function handleDecrease(productId) {
    navigate(`/admin/stock/decrease/${productId}`);
  }

  async function handlePurchase(productId) {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.warning("Please login to purchase");
        navigate("/login");
        return;
      }

      const { data } = await axios.patch(
        `https://mithaighar.onrender.com/product/purchase/${productId}`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (data.message === "Purchase successful") {
        toast.success("Purchase successful");

        fetchProducts(search);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Purchase failed");
    }
  }

  return (
    <div className="home-container">
      
      <div className="home-header">
        <h1 className="logo">🍬 Mithai Ghar</h1>

        <div className="header-right">
          <input
            type="text"
            placeholder="Search sweets..."
            className="search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {isAdmin && (
            <button className="add-product-btn" onClick={handleAdd}>
              + Add New Product
            </button>
          )}
        </div>
      </div>

      <div className="product-grid">
        {loading ? (
          <p className="empty-text">Loading...</p>
        ) : products.length === 0 ? (
          <p className="empty-text">No sweets found</p>
        ) : (
          products.map((product) => (
            <div className="product-card" key={product._id}>
              <img src={`https://mithaighar.onrender.com/uploads/${product.image}`} alt={product.name} />

              <div className="product-info">
                <h3>{product.name}</h3>
                <p className="price">₹{product.price}</p>
                <p className="qty">
                  {product.quantity > 0
                    ? `Stock: ${product.quantity}`
                    : "Out of stock"}
                </p>
              </div>

              {!isAdmin && (
                <button
                  className="purchase-btn"
                  disabled={product.quantity === 0}
                  onClick={() => handlePurchase(product._id)}
                >
                  Purchase
                </button>
              )}

              {isAdmin && (
                <div className="admin-actions">
                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(product._id)}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(product._id)}
                  >
                    Delete
                  </button>

                  <div className="stock-actions">
                    <button
                      className="stock-btn"
                      disabled={product.quantity === 0}
                      onClick={() => handleDecrease(product._id)}
                    >
                      −
                    </button>
                    <button
                      className="stock-btn"
                      onClick={() => handleIncrease(product._id)}
                    >
                      +
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}