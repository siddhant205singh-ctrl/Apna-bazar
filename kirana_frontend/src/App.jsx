import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

// Customer Pages
import HomePage from './pages/customer/HomePage';
import OrdersPage from './pages/customer/OrdersPage';

// Owner Pages
import OwnerLoginPage from './pages/owner/OwnerLoginPage';
import DashboardPage from './pages/owner/DashboardPage';
import OwnerOrdersPage from './pages/owner/OwnerOrdersPage';
import ProductsPage from './pages/owner/ProductsPage';
import CustomersPage from './pages/owner/CustomersPage';

// Components
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Routes>
            {/* Customer Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/orders" element={
              <ProtectedRoute>
                <OrdersPage />
              </ProtectedRoute>
            } />

            {/* Owner Routes */}
            <Route path="/owner" element={<Navigate to="/owner/login" replace />} />
            <Route path="/owner/login" element={<OwnerLoginPage />} />
            
            <Route path="/owner/dashboard" element={
              <ProtectedRoute requireOwner>
                <DashboardPage />
              </ProtectedRoute>
            } />
            <Route path="/owner/orders" element={
              <ProtectedRoute requireOwner>
                <OwnerOrdersPage />
              </ProtectedRoute>
            } />
            <Route path="/owner/products" element={
              <ProtectedRoute requireOwner>
                <ProductsPage />
              </ProtectedRoute>
            } />
            <Route path="/owner/customers" element={
              <ProtectedRoute requireOwner>
                <CustomersPage />
              </ProtectedRoute>
            } />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
