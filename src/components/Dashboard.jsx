import { useState, useEffect } from 'react';
import { formatGuarani } from '../utils/formatters';

const Dashboard = ({ products, onAddProduct, onEdit, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  // Log para depuración
  useEffect(() => {
    console.log('Dashboard received products:', products);
    console.log('Products length:', products.length);
  }, [products]);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.codigo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === '' || product.categoria === filterCategory;
    return matchesSearch && matchesCategory;
  });

  // Log para depuración
  useEffect(() => {
    console.log('Filtered products:', filteredProducts);
    console.log('Search term:', searchTerm);
    console.log('Filter category:', filterCategory);
  }, [filteredProducts, searchTerm, filterCategory]);

  const categories = [...new Set(products.map(p => p.categoria))];
  const lowStockProducts = products.filter(p => p.stock <= 5);
  const totalProducts = products.length;
  const totalValue = products.reduce((sum, p) => sum + (p.precio * p.stock), 0);

  const getStockStatus = (stock) => {
    if (stock === 0) return { text: 'Sin stock', class: 'red' };
    if (stock <= 5) return { text: 'Stock bajo', class: 'yellow' };
    return { text: 'En stock', class: 'green' };
  };

  return (
    <div className="dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <div className="dashboard-header-content">
          <div className="dashboard-title">
            <div>
              <h1>Dashboard</h1>
              <p>Panel de control de inventario</p>
            </div>
            <button onClick={onAddProduct} className="add-product-btn">
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span>Agregar Producto</span>
            </button>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-content">
              <div className="stat-icon blue">
                <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <div className="stat-info">
                <h3>Total Productos</h3>
                <p>{totalProducts}</p>
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-content">
              <div className="stat-icon green">
                <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <div className="stat-info">
                <h3>Valor Total</h3>
                <p>{formatGuarani(totalValue)}</p>
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-content">
              <div className="stat-icon yellow">
                <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <div className="stat-info">
                <h3>Stock Bajo</h3>
                <p>{lowStockProducts.length}</p>
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-content">
              <div className="stat-icon purple">
                <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
              </div>
              <div className="stat-info">
                <h3>Categorías</h3>
                <p>{categories.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Alerts */}
        {lowStockProducts.length > 0 && (
          <div className="alert">
            <div className="alert-content">
              <div className="alert-icon">
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="alert-text">
                <h3>Alerta de Stock Bajo</h3>
                <p>
                  {lowStockProducts.length} producto{lowStockProducts.length > 1 ? 's' : ''} con stock bajo o agotado.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="filters-section">
          <div className="filters-header">
            <h3>Filtros</h3>
          </div>
          <div className="filters-content">
            <div className="filter-group">
              <label>Buscar</label>
              <input
                type="text"
                placeholder="Buscar por nombre o código..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="filter-group">
              <label>Categoría</label>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
              >
                <option value="">Todas las categorías</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <div className="filter-count">
              {filteredProducts.length} producto{filteredProducts.length !== 1 ? 's' : ''} encontrado{filteredProducts.length !== 1 ? 's' : ''}
            </div>
          </div>
        </div>

        {/* Products Table */}
        <div className="products-section">
          <div className="products-header">
            <h3>Inventario</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="products-table">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Código</th>
                  <th>Categoría</th>
                  <th>Precio</th>
                  <th>Stock</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => {
                  const stockStatus = getStockStatus(product.stock);
                  return (
                    <tr key={product.id}>
                      <td>{product.nombre}</td>
                      <td>{product.codigo}</td>
                      <td>{product.categoria}</td>
                      <td>{formatGuarani(product.precio)}</td>
                      <td>
                        <span className={`stock-badge ${stockStatus.class}`}>
                          {product.stock} - {stockStatus.text}
                        </span>
                      </td>
                      <td>
                        <button
                          onClick={() => onEdit(product)}
                          className="action-btn edit"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => onDelete(product.id)}
                          className="action-btn delete"
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          
          {filteredProducts.length === 0 && (
            <div className="empty-state">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <h3>No hay productos</h3>
              <p>
                {searchTerm || filterCategory ? 'No se encontraron productos con los filtros aplicados.' : 'Comienza agregando tu primer producto.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 