import React, { useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import "../../styles/StockAdjustment.css";
import axios from "axios";
import { toast } from "react-toastify";

export default function StockAdjustment() {
  const { productId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const isIncrease = location.pathname.includes("increase");

  const [quantity, setQuantity] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Unauthorized");
        return;
      }

      setLoading(true);

      const url = isIncrease
        ? `https://mithaighar.onrender.com/product/stock/increase/${productId}`
        : `https://mithaighar.onrender.com/product/stock/decrease/${productId}`;

      const { data } = await axios.post(
        url,
        { quantity: Number(quantity) },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      toast.success(data.message);
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Stock update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="stock-page">
      <div className="stock-card">
        <h1 className="page-title">
          {isIncrease ? "📦 Increase Stock" : "📉 Decrease Stock"}
        </h1>

        <p className="page-subtitle">
          {isIncrease
            ? "Add quantity to existing stock"
            : "Remove quantity from existing stock"}
        </p>

        <form onSubmit={handleSubmit} className="stock-form">
          <div className="input-group">
            <label>Quantity</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              min="1"
              required
            />
          </div>

          <button
            type="submit"
            className={`submit-btn ${isIncrease ? "increase" : "decrease"}`}
            disabled={loading}
          >
            {loading
              ? "Processing..."
              : isIncrease
              ? "Increase Stock"
              : "Decrease Stock"}
          </button>
        </form>
      </div>
    </div>
  );
}