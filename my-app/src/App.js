import 'bootstrap/dist/css/bootstrap.min.css';
import './Css/App.css';
import { useState, useEffect } from 'react';

function App() {
  // สร้าง state เพื่อเก็บข้อมูลสินค้าและหน้าปัจจุบัน
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 25; // จำนวนสินค้าต่อหน้า

  // ใช้ useEffect เพื่อเรียก API เมื่อ component โหลดครั้งแรก
  useEffect(() => {
    fetch("http://175.17.4.34:8888/uat/getAllProduct")
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error("เกิดข้อผิดพลาด:", error));
  }, []);

  // คำนวณจำนวนหน้าทั้งหมด
  const totalPages = Math.ceil(products.length / productsPerPage);

  // หาสินค้าที่จะแสดงในหน้าปัจจุบัน
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // ฟังก์ชันสำหรับเปลี่ยนหน้า
  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="container mt-4">
      <h1>รายการสินค้า</h1>
      <div className="row">
        {products.length > 0 ? (
          currentProducts.map(product => (
            <div className="col-md-4 mb-3" key={product.productId}>
              <div className="card">
                <img src={product.imgUrl} className="card-img-top" alt={product.productName} />
                <div className="card-body">
                  <h5 className="card-title">{product.productName}</h5>
                  <p className="card-text">{product.productDescription}</p>
                  <p className="card-text">ราคา: {product.price} บาท</p>
                  <p className="card-text">สถานะ: {product.status}</p>
                  <button className="btn btn-primary">ดูรายละเอียด</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>กำลังโหลดข้อมูล...</p>
        )}
      </div>

      {/* Pagination */}
      {products.length > 0 && (
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

export default App;