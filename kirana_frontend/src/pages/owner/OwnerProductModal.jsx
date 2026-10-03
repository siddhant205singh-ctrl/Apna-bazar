import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import api from '../../api/api';

const CATEGORIES = [
  { value: 'fruits-veg', label: 'Fruits & Veg' },
  { value: 'dairy', label: 'Dairy & Bakery' },
  { value: 'staples', label: 'Atta/Rice/Dals' },
  { value: 'snacks', label: 'Snacks' },
  { value: 'beverages', label: 'Beverages' },
  { value: 'household', label: 'Household' }
];

const OwnerProductModal = ({ product, onClose, onSave, showToast }) => {
  const isEdit = !!product;
  const [formData, setFormData] = useState({
    name: '', name_hi: '',
    category: 'fruits-veg',
    price: '', originalPrice: '',
    unit: '', unit_hi: '',
    image: '',
    description: '', description_hi: '',
    inStock: true
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        name_hi: product.name_hi || '',
        category: product.category || 'fruits-veg',
        price: product.price || '',
        originalPrice: product.originalPrice || '',
        unit: product.unit || '',
        unit_hi: product.unit_hi || '',
        image: product.image || '',
        description: product.description || '',
        description_hi: product.description_hi || '',
        inStock: product.inStock !== undefined ? product.inStock : true
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await api.put(`/products/${product._id}`, formData);
        showToast('Product updated successfully', 'success');
      } else {
        await api.post('/products', formData);
        showToast('Product created successfully', 'success');
      }
      onSave();
    } catch (err) {
      console.error(err);
      showToast(err.response?.data?.message || 'Failed to save product', 'error');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await api.delete(`/products/${product._id}`);
        showToast('Product deleted successfully', 'success');
        onSave();
      } catch (err) {
        console.error(err);
        showToast('Failed to delete product', 'error');
      }
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: '600px', width: '90%', maxHeight: '90vh', overflowY: 'auto' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: '16px', right: '16px' }}><X size={24} /></button>
        
        <h2 style={{ marginBottom: '24px' }}>{isEdit ? 'Edit Product' : 'Add New Product'}</h2>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Name (English)</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required className="form-input" />
            </div>
            <div>
              <label style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Name (Hindi)</label>
              <input type="text" name="name_hi" value={formData.name_hi} onChange={handleChange} className="form-input" />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Price (₹)</label>
              <input type="number" name="price" value={formData.price} onChange={handleChange} required className="form-input" />
            </div>
            <div>
              <label style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Original Price (₹)</label>
              <input type="number" name="originalPrice" value={formData.originalPrice} onChange={handleChange} className="form-input" />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Unit (English) e.g. 1 kg</label>
              <input type="text" name="unit" value={formData.unit} onChange={handleChange} required className="form-input" />
            </div>
            <div>
              <label style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Unit (Hindi)</label>
              <input type="text" name="unit_hi" value={formData.unit_hi} onChange={handleChange} className="form-input" />
            </div>
          </div>

          <div>
            <label style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Category</label>
            <select name="category" value={formData.category} onChange={handleChange} required className="form-input" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
              {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
            </select>
          </div>

          <div>
            <label style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Image URL</label>
            <input type="text" name="image" value={formData.image} onChange={handleChange} className="form-input" />
          </div>

          <div>
            <label style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Description (English)</label>
            <textarea name="description" value={formData.description} onChange={handleChange} className="form-input" rows="3"></textarea>
          </div>
          <div>
            <label style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Description (Hindi)</label>
            <textarea name="description_hi" value={formData.description_hi} onChange={handleChange} className="form-input" rows="3"></textarea>
          </div>

          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <input type="checkbox" name="inStock" checked={formData.inStock} onChange={handleChange} style={{ width: '20px', height: '20px' }} />
            <span style={{ fontWeight: '500' }}>Product is In Stock</span>
          </label>

          <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
            <button type="submit" className="btn btn-primary" style={{ flex: 1, padding: '12px' }}>
              {isEdit ? 'Save Changes' : 'Create Product'}
            </button>
            {isEdit && (
              <button type="button" onClick={handleDelete} className="btn btn-outline" style={{ color: 'var(--error)', borderColor: 'var(--error)' }}>
                Delete
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default OwnerProductModal;
