import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Bar({
  products,
  searchQuery,
  setSearchQuery,
  setFilteredProducts,
  setCurrentPage,
}) {
  const [suggestions, setSuggestions] = React.useState([]);
  const [showSuggestions, setShowSuggestions] = React.useState(false);

  // จัดการการค้นหาและคำแนะนำขณะพิมพ์
  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setCurrentPage(1); // รีเซ็ตกลับไปหน้าแรก

    if (query.length > 0) {
      const filtered = products.filter(
        (product) =>
          product.productName.toLowerCase().includes(query) ||
          product.productDescription.toLowerCase().includes(query)
      );
      setFilteredProducts(filtered);

      const suggestionList = products
        .map((product) => [
          product.productName.toLowerCase(),
          product.productDescription.toLowerCase(),
        ])
        .flat()
        .filter((item) => item.includes(query))
        .slice(0, 5);
      setSuggestions([...new Set(suggestionList)]);
      setShowSuggestions(true);
    } else {
      setFilteredProducts(products);
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  // เมื่อเลือกคำแนะนำ
  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
    const filtered = products.filter(
      (product) =>
        product.productName.toLowerCase().includes(suggestion) ||
        product.productDescription.toLowerCase().includes(suggestion)
    );
    setFilteredProducts(filtered);
    setCurrentPage(1);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <a className="navbar-brand" href="#">
        MyApp
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav me-auto">
          <li className="nav-item">
            <a className="nav-link" href="#">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              About
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Contact
            </a>
          </li>
        </ul>
        {/* ช่องค้นหาพร้อมคำแนะนำ */}
        <div className="position-relative d-flex">
          <input
            className="form-control me-2"
            type="search"
            placeholder="ค้นหาสินค้า..."
            aria-label="Search"
            value={searchQuery}
            onChange={handleSearchChange}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            onFocus={() => searchQuery && setShowSuggestions(true)}
          />
          {showSuggestions && suggestions.length > 0 && (
            <ul
              className="list-group position-absolute"
              style={{
                top: "100%",
                right: 0,
                zIndex: 1000,
                width: "200px",
              }}
            >
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="list-group-item list-group-item-action"
                  onClick={() => handleSuggestionClick(suggestion)}
                  style={{ cursor: "pointer" }}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Bar;
