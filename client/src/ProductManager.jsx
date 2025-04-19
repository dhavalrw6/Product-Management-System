import { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function ProductManager() {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    sku: '',
    product_name: '',
    category: '',
    material: '',
    status: ''
  });
  const [page, setPage] = useState(1);
  const [formData, setFormData] = useState({
    sku: '', product_name: '', category: '', material: '', status: '', price: ''
  });
  const [editId, setEditId] = useState(null);
  const [stats, setStats] = useState({});

  // Fetch products with filters
  const fetchProducts = async () => {
    const res = await axios.get('http://localhost:5000/api/products', {
      params: { ...filters, page, limit: 5 }
    });
    setProducts(res.data);
  };

  // Fetch statistics
  const fetchStats = async () => {
    const res = await axios.get('http://localhost:5000/api/products/stats');
    setStats(res.data);
  };

  // Handle form submit (Add/Update product)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await axios.put(`http://localhost:5000/api/products/${editId}`, formData);
    } else {
      await axios.post('http://localhost:5000/api/products', formData);
    }
    setFormData({ sku: '', product_name: '', category: '', material: '', status: '', price: '' });
    setEditId(null);
    fetchProducts();
    fetchStats();
  };

  // Handle edit product
  const handleEdit = (product) => {
    setEditId(product.id);
    setFormData(product);
  };

  // Handle delete product
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/products/${id}`);
    fetchProducts();
    fetchStats();
  };

  // Fetch data on page load or when filters/page change
  useEffect(() => {
    fetchProducts();
    fetchStats();
  }, [page, filters]);

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">📦 Product Management</h1>

      <form onSubmit={handleSubmit} className="row g-3 mb-4">
        {/* Render form fields dynamically */}
        {Object.keys(formData).map((key, index) => (
          key === 'status' ? (
            <div className="col-md-4" key={index}>
              <select
                className="form-select"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <option value="">-- Select Status --</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          ) : (
            <div className="col-md-4" key={index}>
              <input
                type="text"
                className="form-control"
                placeholder={key.charAt(0).toUpperCase() + key.slice(1)} // Capitalize key
                value={formData[key]}
                onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
              />
            </div>
          )
        ))}
        <div className="col-12">
          <button type="submit" className="btn btn-primary w-100">
            {editId ? 'Update' : 'Add'} Product
          </button>
        </div>
      </form>

      <div className="row g-2 mb-4">
        {/* Filters for searching products */}
        {Object.keys(filters).map((key, index) => (
          <div className="col-md-2" key={index}>
            <input
              type="text"
              className="form-control"
              placeholder={key.charAt(0).toUpperCase() + key.slice(1)} // Capitalize key
              value={filters[key]}
              onChange={(e) => setFilters({ ...filters, [key]: e.target.value })}
            />
          </div>
        ))}
      </div>

      {/* Display product table */}
      <table className="table table-bordered text-center">
        <thead className="table-dark">
          <tr>
            <th>ID</th><th>Name</th><th>Category</th><th>Price</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.product_name}</td>
              <td>{p.category}</td>
              <td>${p.price}</td>
              <td>
                <button onClick={() => handleEdit(p)} className="btn btn-sm btn-warning me-2">Edit</button>
                <button onClick={() => handleDelete(p.id)} className="btn btn-sm btn-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <button onClick={() => setPage(p => Math.max(p - 1, 1))} className="btn btn-secondary">Prev</button>
        <span className="fw-semibold">Page {page}</span>
        <button onClick={() => setPage(p => p + 1)} className="btn btn-secondary">Next</button>
      </div>

      {/* Product Stats */}
      <div className="bg-light p-4 rounded shadow">
        <h4 className="mb-3">📊 Statistics</h4>
        <pre className="bg-white p-3 rounded border small">{JSON.stringify(stats, null, 2)}</pre>
      </div>
    </div>
  );
}
