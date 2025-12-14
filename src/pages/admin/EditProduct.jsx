import React, { useEffect, useState } from "react";
import "../../styles/AddProduct.css";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    quantity: 1,
    image: null,
  });

  const [loading, setLoading] = useState(true);

  // ---------------- FETCH PRODUCT (PREFILL) ----------------
  useEffect(() => {
    async function fetchProduct() {
      try {
        const token = localStorage.getItem("token");

        const { data } = await axios.get(
          `http://localhost:5000/product/item/${id}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );

        if (data.message === "success") {
          setForm({
            name: data.data.name,
            category: data.data.category,
            price: data.data.price,
            quantity: data.data.quantity,
            image: null, // image optional on edit
          });
        }
      } catch (err) {
        toast.error("Failed to load product");
        navigate("/");
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id, navigate]);

  // ---------------- HANDLE CHANGE ----------------
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      setForm({ ...form, image: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // ---------------- SUBMIT EDIT ----------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("category", form.category);
      formData.append("price", form.price);
      formData.append("quantity", form.quantity);

      // only append image if changed
      if (form.image) {
        formData.append("image", form.image);
      }

      const { data } = await axios.put(
        `http://localhost:5000/product/edit/${id}`,
        formData,
        {
          headers: {
            Authorization: token,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (data.message === "success") {
        toast.success("Product updated successfully");
        navigate("/");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    }
  };

  if (loading) {
    return <p className="empty-text">Loading product...</p>;
  }

  return (
    <div className="add-product-page">
      <div className="add-product-card">
        <h1 className="page-title">✏️ Edit Product</h1>
        <p className="page-subtitle">Update product details</p>

        <form onSubmit={handleSubmit} className="add-product-form">
          <div className="input-group">
            <label>Product Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Category</label>
            <input
              type="text"
              name="category"
              value={form.category}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Price (₹)</label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              required
              min="0"
            />
          </div>

          <div className="input-group">
            <label>Quantity</label>
            <input
              type="number"
              name="quantity"
              value={form.quantity}
              onChange={handleChange}
              required
              min="1"
            />
          </div>

          <div className="input-group">
            <label>Product Image (optional)</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="submit-btn">
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
}