import { useState, useEffect } from 'react';

function Home({ searchTerm }) {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 25;

  useEffect(() => {
    fetch("http://192.168.43.222:8888/uat/getAllProduct")
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error("เกิดข้อผิดพลาด:", error));
  }, []);

  // กรองสินค้าตามคำค้นหา
  const filteredProducts = products.filter(product =>
    product.productName.toLowerCase().includes(searchTerm ? searchTerm.toLowerCase() : '')
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="container mt-4">
      <h1>รายการสินค้า</h1>
      <div className="row">
        {filteredProducts.length > 0 ? (
          currentProducts.map(product => (
            <div className="col-md-2 col-sm-4 mb-3" key={product.productId}>
              <div className="card h-100">
                <img src={product.imgUrl} className="card-img-top" alt={product.productName} />
                <div className="card-body">
                  <h6 className="card-title">{product.productName}</h6>
                  <p className="card-text text-truncate">{product.productDescription}</p>
                  <p className="card-text">ราคา: {product.price} บาท</p>
                  <button className="btn btn-primary btn-sm">ซื้อเลย</button>
                </div>
              </div>
            </div>
          ))
        ) : products.length === 0 ? (
          <p>กำลังโหลดข้อมูล...</p>
        ) : (
          <p>ไม่พบสินค้าที่ตรงกับคำค้นหา</p>
        )}
      </div>

      {filteredProducts.length > 0 && (
        <nav className="d-flex justify-content-center mt-4">
          <ul className="pagination">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>
                ก่อนหน้า
              </button>
            </li>
            {Array.from({ length: totalPages }, (_, index) => (
              <li
                className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
                key={index + 1}
              >
                <button className="page-link" onClick={() => handlePageChange(index + 1)}>
                  {index + 1}
                </button>
              </li>
            ))}
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>
                ถัดไป
              </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}

export default Home;