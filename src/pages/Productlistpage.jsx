import React, { useState } from "react";
import "../css/Productlistpage.css";
import data from "../data/product.json";

const CATEGORIES = ["All", ...new Set(data.map((p) => p.category))];

const ProductListPage = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filtered = data.filter((p) => {
    const matchCat = category === "All" || p.category === category;
    const matchText = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchText;
  });

  return (
    <div className="product-page">
      <div className="product-header">
        <div>
          <h1>Product List</h1>
        </div>
        <div className="product-controls mb-4 mb-sm-0">
          <input
            type="text"
            placeholder="Search products…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
          <div className="category-tabs">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                className={
                  "cat-tab" + (category === cat ? " cat-tab--active" : "")
                }
                onClick={() => setCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="product-grid">
        {filtered.map((product) => (
          <div key={product.id} className="product-card">
            <span className="product-badge">{product.rating}</span>
            <div className="product-imgpos">
              <img
                src={product.image}
                width={120}
                height={120}
                alt={product.name}
              />
            </div>
            <div className="product-info">
              <span className="product-category">{product.category}</span>
              <h3 className="product-name">{product.name}</h3>
              <div className="product-footer">
                <span className="product-price">
                  ₹{product.price.toFixed(2)}
                </span>
                <span className={"product-stock"}>
                  {product.stock} in stock
                </span>
              </div>
            </div>
            {/* <button className="add-btn">Add to Cart</button> */}
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="no-results">
            <p>No products found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductListPage;
