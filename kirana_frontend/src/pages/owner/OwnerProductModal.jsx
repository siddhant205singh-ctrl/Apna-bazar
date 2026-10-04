import React, { useState, useEffect } from 'react';
import { X, Save, Trash2, Image as ImageIcon } from 'lucide-react';
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
      <div 
        className="modal-content" 
        style={{ 
          maxWidth: '750px', 
          width: '95%', 
          maxHeight: '90vh', 
          display: 'flex', 
          flexDirection: 'column',
          padding: 0 // Remove default padding to handle header/body/footer structure
        }}
      >
        {/* Header */}
        <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--card-bg)' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '900', margin: 0 }}>
            {isEdit ? '✏️ Edit Product' : '📦 Add New Product'}
          </h2>
          <button onClick={onClose} className="btn btn-ghost" style={{ padding: '4px' }}>
            <X size={24} />
          </button>
        </div>
        
        {/* Scrollable Form Body */}
        <div style={{ padding: '24px', overflowY: 'auto', flexGrow: 1, background: 'var(--bg-color)' }}>
          <form id="product-form" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* Row 1: Names */}
            <div className="grid grid-cols-2 gap-4">
              <div className="form-group">
                <label className="form-label">Name (English) *</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required className="form-input" placeholder="e.g. Fresh Red Tomatoes" />
              </div>
              <div className="form-group">
                <label className="form-label">Name (Hindi)</label>
                <input type="text" name="name_hi" value={formData.name_hi} onChange={handleChange} className="form-input" placeholder="e.g. ताज़ा लाल टमाटर" />
              </div>
            </div>

            {/* Row 2: Pricing & Category */}
            <div className="grid grid-cols-3 gap-4">
              <div className="form-group">
                <label className="form-label">Price (₹) *</label>
                <input type="number" name="price" value={formData.price} onChange={handleChange} required className="form-input" placeholder="0" />
              </div>
              <div className="form-group">
                <label className="form-label">Original Price (₹)</label>
                <input type="number" name="originalPrice" value={formData.originalPrice} onChange={handleChange} className="form-input" placeholder="0" />
              </div>
              <div className="form-group">
                <label className="form-label">Category *</label>
                <select name="category" value={formData.category} onChange={handleChange} required className="form-input" style={{ cursor: 'pointer' }}>
                  {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                </select>
              </div>
            </div>

            {/* Row 3: Units */}
            <div className="grid grid-cols-2 gap-4">
              <div className="form-group">
                <label className="form-label">Unit (English) *</label>
                <input type="text" name="unit" value={formData.unit} onChange={handleChange} required className="form-input" placeholder="e.g. 1 kg, 500 ml" />
              </div>
              <div className="form-group">
                <label className="form-label">Unit (Hindi)</label>
                <input type="text" name="unit_hi" value={formData.unit_hi} onChange={handleChange} className="form-input" placeholder="e.g. 1 किलो" />
              </div>
            </div>

            {/* Row 4: Image with Preview */}
            <div className="form-group">
              <label className="form-label">Image URL</label>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div style={{ 
                  width: '80px', height: '80px', 
                  borderRadius: '12px', 
                  background: 'var(--input-bg)', 
                  border: '1.5px dashed var(--border-color)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  overflow: 'hidden', flexShrink: 0
                }}>
                  {formData.image ? (
                    <img src={formData.image} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                  ) : (
                    <ImageIcon color="var(--text-muted)" size={32} opacity={0.5} />
                  )}
                </div>
                <input type="text" name="image" value={formData.image} onChange={handleChange} className="form-input" placeholder="https://..." style={{ flexGrow: 1, alignSelf: 'center' }} />
              </div>
            </div>

            {/* Row 5: Descriptions */}
            <div className="grid grid-cols-2 gap-4">
              <div className="form-group">
                <label className="form-label">Description (English)</label>
                <textarea name="description" value={formData.description} onChange={handleChange} className="form-input" rows="3" placeholder="Short product description..."></textarea>
              </div>
              <div className="form-group">
                <label className="form-label">Description (Hindi)</label>
                <textarea name="description_hi" value={formData.description_hi} onChange={handleChange} className="form-input" rows="3" placeholder="उत्पाद का संक्षिप्त विवरण..."></textarea>
              </div>
            </div>

            {/* Stock Toggle */}
            <label style={{ 
              display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', 
              background: formData.inStock ? 'var(--primary-light)' : 'var(--input-bg)',
              padding: '16px', borderRadius: '12px', border: `1.5px solid ${formData.inStock ? 'var(--primary)' : 'var(--border-color)'}`,
              transition: 'all 0.2s'
            }}>
              <input type="checkbox" name="inStock" checked={formData.inStock} onChange={handleChange} style={{ width: '20px', height: '20px', accentColor: 'var(--primary)' }} />
              <div>
                <div style={{ fontWeight: '800', color: formData.inStock ? 'var(--primary)' : 'var(--text-main)', fontSize: '15px' }}>
                  {formData.inStock ? 'Currently In Stock' : 'Out of Stock'}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                  Toggle to hide or show this product to customers.
                </div>
              </div>
            </label>

          </form>
        </div>

        {/* Footer Actions */}
        <div style={{ padding: '20px 24px', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', background: 'var(--card-bg)' }}>
          {isEdit ? (
            <button type="button" onClick={handleDelete} className="btn" style={{ background: '#fef2f2', color: '#dc2626', border: '1.5px solid #fca5a5' }}>
              <Trash2 size={18} /> Delete Product
            </button>
          ) : <div></div>}
          
          <div style={{ display: 'flex', gap: '12px' }}>
            <button type="button" onClick={onClose} className="btn btn-outline">Cancel</button>
            <button type="submit" form="product-form" className="btn btn-primary" style={{ paddingLeft: '24px', paddingRight: '24px' }}>
              <Save size={18} /> {isEdit ? 'Save Changes' : 'Create Product'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default OwnerProductModal;
