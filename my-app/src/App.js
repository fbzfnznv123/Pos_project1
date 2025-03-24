import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Bar from "./bar"; // นำเข้า Bar Component

function App() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const itemsPerPage = 25;

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("http://175.17.4.34:8888/uat/getAllProduct");
                setProducts(response.data);
                setFilteredProducts(response.data);
            } catch (error) {
                console.error(
                    "Error fetching products:",
                    error.response ? error.response.data : error.message
                );
            }
        };

        fetchProducts();
    }, []);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div>
            {/* ใช้ Bar Component */}
            <Bar
                products={products}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                setFilteredProducts={setFilteredProducts}
                setCurrentPage={setCurrentPage}
            />

            {/* เนื้อหา Product Catalog */}
            <div className="container my-5">
                <h1 className="mb-4">Product Catalog</h1>
                <div className="row row-cols-5 g-1">
                    {currentItems.length > 0 ? (
                        currentItems.map((product) => (
                            <div className="col mb-4" key={product.productId}>
                                <div className="card h-100">
                                    <img
                                        src={product.imgUrl}
                                        className="card-img-top"
                                        alt={product.productName}
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">{product.productName}</h5>
                                        <p className="card-text">{product.productDescription}</p>
                                        <p className="card-text">
                                            <strong>Price:</strong> ${(product.price / 100).toFixed(2)}
                                        </p>
                                        <p className="card-text">
                                            <small className="text-muted">
                                                Stock ID: {product.stockId} | Status: {product.status}
                                            </small>
                                        </p>
                                    </div>
                                    <div className="card-footer">
                                        <small className="text-muted">
                                            Last updated: {new Date(product.updateAt).toLocaleDateString()}
                                        </small>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col">
                            <p>ไม่มีสินค้าที่ตรงกับคำค้นหาหรือกำลังโหลด...</p>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <nav aria-label="Page navigation" className="d-flex justify-content-center mt-4">
                        <ul className="pagination">
                            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                                <button
                                    className="page-link"
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                >
                                    Previous
                                </button>
                            </li>
                            {[...Array(totalPages)].map((_, index) => (
                                <li
                                    className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
                                    key={index + 1}
                                >
                                    <button
                                        className="page-link"
                                        onClick={() => handlePageChange(index + 1)}
                                    >
                                        {index + 1}
                                    </button>
                                </li>
                            ))}
                            <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                                <button
                                    className="page-link"
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                >
                                    Next
                                </button>
                            </li>
                        </ul>
                    </nav>
                )}
            </div>
        </div>
    );
}

export default App;