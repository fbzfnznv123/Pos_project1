import { Link } from 'react-router-dom';

function Navbar({ onSearch }) {
  const handleSearch = (e) => {
    e.preventDefault(); // ป้องกันการรีเฟรชหน้า
    const searchTerm = e.target.elements.search.value; // ดึงค่าจาก input
    onSearch(searchTerm); // ส่งคำค้นหาไปยังฟังก์ชันที่รับมาใน props
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">ร้านค้าออนไลน์</Link>
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
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">หน้าแรก</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">เกี่ยวกับเรา</Link>
            </li>
          </ul>
          <form className="d-flex" onSubmit={handleSearch}>
            <input
              className="form-control me-2"
              type="search"
              name="search" // เพิ่ม name เพื่อให้ดึงค่าได้ง่าย
              placeholder="ค้นหาสินค้า"
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              ค้นหา
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;