import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken, logout, authFetch } from '../utils/auth';
import '../styles/Admin.css';
import API_URL from "../config";

function Admin({ onLogout }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [adminUserName, setAdminUserName] = useState('');
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });
  
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    productName: '',
    productDescription: '',
    productType: '',
    productImage: ''
  });
  
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: '' });
    }, 3000);
  };

  const fetchProducts = useCallback(async () => {
    try {
      const response = await authFetch('http://localhost:8081/product/getAllProducts', {
        method: 'GET',
      });
      
      if (!response) return;
      
      if (response.status === 401) {
        logout();
        navigate('/login');
        return;
      }
      
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      
      const data = await response.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
    }
  }, [navigate]);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      navigate('/login');
      return;
    }
    
    const userName = localStorage.getItem('adminUserName');
    setAdminUserName(userName || 'Admin');
    
    fetchProducts();
    
    setOrders([
      { id: 'ORD001', customer: 'Rajesh Kumar', amount: '12,999', date: '2024-01-15', status: 'Delivered' },
      { id: 'ORD002', customer: 'Priya Sharma', amount: '25,998', date: '2024-01-14', status: 'Processing' },
      { id: 'ORD003', customer: 'Amit Patel', amount: '13,999', date: '2024-01-13', status: 'Shipped' },
    ]);
    
    setUsers([
      { id: 1, name: 'Admin User', username: 'admin', role: 'Admin', status: 'Active' },
      { id: 2, name: 'John Doe', username: 'john_doe', role: 'Customer', status: 'Active' },
      { id: 3, name: 'Jane Smith', username: 'jane_smith', role: 'Customer', status: 'Inactive' },
    ]);
  }, [navigate, fetchProducts]);

  const handleSubmitProduct = async (e) => {
    e.preventDefault();
    
    if (!formData.productName || !formData.productDescription || !formData.productType) {
      showNotification('Please fill in all required fields', 'error');
      return;
    }
    
    setLoading(true);
    
    try {
      const payload = editingProduct 
        ? { ...formData, id: editingProduct.id }
        : formData;
      
      const url = editingProduct 
        ? 'http://localhost:8081/product/editProduct'
        : 'http://localhost:8081/product/addProduct';
      
      const method = editingProduct ? 'PUT' : 'POST';
      
      const response = await authFetch(url, {
        method: method,
        body: JSON.stringify(payload),
      });
      
      if (!response) return;
      
      if (response.status === 401) {
        navigate('/login');
        showNotification('Session expired. Please login again.', 'error');
        return;
      }
      
     await response.text();
showNotification('Product deleted successfully', 'success');
      setShowProductForm(false);
      await fetchProducts();
    } catch (error) {
      console.error('Error saving product:', error);
      showNotification('Error saving product', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setLoading(true);
      try {
        const response = await authFetch(`http://localhost:8081/product/deleteProduct/${id}`, {
          method: 'DELETE',
        });
        
        if (!response) return;
        
        if (response.status === 401) {
          navigate('/login');
          return;
        }
        
        await response.text();
        showNotification('Product deleted successfully', 'success');
        await fetchProducts();
      } catch (error) {
        console.error('Error deleting product:', error);
        showNotification('Error deleting product', 'error');
      } finally {
        setLoading(false);
      }
    }
  };

  // Rest of your component remains the same...
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
      if (!validTypes.includes(file.type)) {
        showNotification('Please select a valid image file (JPG, PNG, GIF)', 'error');
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) {
        showNotification('File size must be less than 5MB', 'error');
        return;
      }
      
      setSelectedFile(file);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData(prev => ({ ...prev, productImage: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddProduct = () => {
    setEditingProduct(null);
    setFormData({
      productName: '',
      productDescription: '',
      productType: '',
      productImage: ''
    });
    setSelectedFile(null);
    setImagePreview('');
    setShowProductForm(true);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setFormData({
      productName: product.productName || '',
      productDescription: product.productDescription || '',
      productType: product.productType || '',
      productImage: product.productImage || ''
    });
    setImagePreview(product.productImage || '');
    setSelectedFile(null);
    setShowProductForm(true);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogout = () => {
    logout();
    if (onLogout) onLogout();
    navigate('/login');
  };

  // Rest of your JSX remains the same...
  return (
    <div className="admin-container">
      {/* Notification Toast */}
      {notification.show && (
        <div className={`notification-toast ${notification.type}`}>
          <i className={`fas ${notification.type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}`}></i>
          <span>{notification.message}</span>
        </div>
      )}
      
      {/* Admin Header */}
      <div className="admin-header">
        <div className="admin-title">
          <i className="fas fa-shield-alt"></i>
          <h1>Admin Dashboard</h1>
        </div>
        <div className="admin-profile">
          <i className="fas fa-bell"></i>
          <div className="admin-avatar">
            <i className="fas fa-user-circle"></i>
            <span>{adminUserName}</span>
          </div>
          <button className="logout-btn" onClick={handleLogout} title="Logout">
            <i className="fas fa-sign-out-alt"></i>
          </button>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="admin-stats">
        <div className="stat-card">
          <div className="stat-icon blue">
            <i className="fas fa-box"></i>
          </div>
          <div className="stat-info">
            <h3>{products.length}</h3>
            <p>Total Products</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon orange">
            <i className="fas fa-shopping-cart"></i>
          </div>
          <div className="stat-info">
            <h3>{orders.length}</h3>
            <p>Total Orders</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon green">
            <i className="fas fa-users"></i>
          </div>
          <div className="stat-info">
            <h3>{users.length}</h3>
            <p>Total Users</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon purple">
            <i className="fas fa-chart-line"></i>
          </div>
          <div className="stat-info">
            <h3>₹1,45,000</h3>
            <p>Total Revenue</p>
          </div>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="admin-tabs">
        <button 
          className={`tab-btn ${activeTab === 'products' ? 'active' : ''}`}
          onClick={() => setActiveTab('products')}
        >
          <i className="fas fa-box"></i> Products
        </button>
        <button 
          className={`tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
          onClick={() => setActiveTab('orders')}
        >
          <i className="fas fa-shopping-cart"></i> Orders
        </button>
        <button 
          className={`tab-btn ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          <i className="fas fa-users"></i> Users
        </button>
        <button 
          className={`tab-btn ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          <i className="fas fa-cog"></i> Settings
        </button>
      </div>
      
      {/* Products Tab */}
      {activeTab === 'products' && (
        <div className="admin-table-container">
          <div className="table-header">
            <h2><i className="fas fa-box"></i> Product Management</h2>
            <button className="btn-add" onClick={handleAddProduct}>
              <i className="fas fa-plus"></i> Add Product
            </button>
          </div>
          
          {/* Product Form Modal */}
          {showProductForm && (
            <div className="modal-overlay" onClick={() => setShowProductForm(false)}>
              <div className="product-form-modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                  <h3>{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>
                  <button className="modal-close" onClick={() => setShowProductForm(false)}>
                    <i className="fas fa-times"></i>
                  </button>
                </div>
                <form onSubmit={handleSubmitProduct}>
                  <div className="form-group">
                    <label>Product Name *</label>
                    <input
                      type="text"
                      name="productName"
                      value={formData.productName}
                      onChange={handleInputChange}
                      placeholder="Enter product name"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Product Description *</label>
                    <textarea
                      name="productDescription"
                      value={formData.productDescription}
                      onChange={handleInputChange}
                      rows="3"
                      placeholder="Enter product description"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Product Type *</label>
                    <select
                      name="productType"
                      value={formData.productType}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Type</option>
                      <option value="Executive Chair">Executive Chair</option>
                      <option value="Office Chair">Office Chair</option>
                      <option value="Mesh Chair">Mesh Chair</option>
                      <option value="Visitor Chair">Visitor Chair</option>
                      <option value="Gaming Chair">Gaming Chair</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label>Product Image</label>
                    <div className="file-upload-container">
                      <div className="file-upload-area">
                        <input
                          type="file"
                          id="productImage"
                          accept="image/jpeg,image/jpg,image/png,image/gif"
                          onChange={handleFileSelect}
                          style={{ display: 'none' }}
                        />
                        <button 
                          type="button" 
                          className="file-upload-btn"
                          onClick={() => document.getElementById('productImage').click()}
                        >
                          <i className="fas fa-cloud-upload-alt"></i> Choose Image
                        </button>
                        <span className="file-name">
                          {selectedFile ? selectedFile.name : 'No file chosen'}
                        </span>
                      </div>
                      
                      {imagePreview && (
                        <div className="image-preview">
                          <img 
                            src={imagePreview} 
                            alt="Preview" 
                            className="preview-image"
                          />
                          <button 
                            type="button"
                            className="remove-image"
                            onClick={() => {
                              setSelectedFile(null);
                              setImagePreview('');
                              setFormData({...formData, productImage: ''});
                            }}
                          >
                            <i className="fas fa-times-circle"></i>
                          </button>
                        </div>
                      )}
                    </div>
                    <small className="form-hint">Supported formats: JPG, PNG, GIF (Max 5MB)</small>
                  </div>
                  
                  <div className="form-actions">
                    <button type="button" className="btn-cancel" onClick={() => setShowProductForm(false)}>
                      Cancel
                    </button>
                    <button type="submit" className="btn-submit" disabled={loading}>
                      {loading ? 'Saving...' : (editingProduct ? 'Update Product' : 'Add Product')}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
          
          <div className="table-responsive">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Image</th>
                  <th>Product Name</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="empty-row">
                      <i className="fas fa-box-open"></i>
                      <p>No products found. Click "Add Product" to create one.</p>
                    </td>
                  </tr>
                ) : (
                  products.map(product => (
                    <tr key={product.id}>
                      <td>{product.id}</td>
                      <td className="image-cell">
                        {product.productImage ? (
                          <img 
                            src={product.productImage} 
                            alt={product.productName}
                            className="product-thumbnail"
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/50?text=No+Image';
                            }}
                          />
                        ) : (
                          <div className="no-image-placeholder">
                            <i className="fas fa-image"></i>
                          </div>
                        )}
                      </td>
                      <td className="product-name-cell">{product.productName}</td>
                      <td className="description-cell">
                        {product.productDescription?.substring(0, 60)}
                        {product.productDescription?.length > 60 && '...'}
                      </td>
                      <td className="actions-cell">
                        <button className="action-btn edit" onClick={() => handleEditProduct(product)} title="Edit">
                          <i className="fas fa-edit"></i>
                        </button>
                        <button className="action-btn delete" onClick={() => handleDeleteProduct(product.id)} title="Delete">
                          <i className="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default Admin;