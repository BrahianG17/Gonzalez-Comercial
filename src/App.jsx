import { useState, useEffect } from 'react';
import { auth, db } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  onSnapshot,
  query,
  where,
  orderBy
} from 'firebase/firestore';
import Auth from './components/Auth';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import ProductForm from './components/ProductForm';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log('Auth state changed:', user ? user.email : 'No user');
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) {
      console.log('No user, clearing products');
      setProducts([]);
      return;
    }

    console.log('Setting up Firestore listener for user:', user.uid);
    
    const q = query(
      collection(db, 'products'),
      where('userId', '==', user.uid),
      orderBy('nombre')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      console.log('Firestore snapshot received:', snapshot.docs.length, 'documents');
      const productsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      console.log('Products data:', productsData);
      setProducts(productsData);
    }, (error) => {
      console.error('Firestore listener error:', error);
    });

    return () => unsubscribe();
  }, [user]);

  const handleAddProduct = async (productData) => {
    try {
      console.log('Adding product:', productData);
      const docRef = await addDoc(collection(db, 'products'), {
        ...productData,
        userId: user.uid,
        createdAt: new Date()
      });
      console.log('Product added successfully with ID:', docRef.id);
      setShowForm(false);
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Error al agregar el producto');
    }
  };

  const handleUpdateProduct = async (productData) => {
    try {
      console.log('Updating product:', editingProduct.id, productData);
      const productRef = doc(db, 'products', editingProduct.id);
      await updateDoc(productRef, {
        ...productData,
        updatedAt: new Date()
      });
      console.log('Product updated successfully');
      setEditingProduct(null);
      setShowForm(false);
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Error al actualizar el producto');
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      try {
        console.log('Deleting product:', productId);
        await deleteDoc(doc(db, 'products', productId));
        console.log('Product deleted successfully');
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('Error al eliminar el producto');
      }
    }
  };

  const handleEditProduct = (product) => {
    console.log('Editing product:', product);
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleLogout = async () => {
    try {
      console.log('Logging out user');
      await auth.signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (loading) {
  return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando...</p>
      </div>
      </div>
    );
  }

  if (!user) {
    return <Auth onAuthStateChange={setUser} />;
  }

  console.log('Rendering App with user:', user.email, 'and products:', products.length);

  return (
    <div className="App">
      <Header onLogout={handleLogout} user={user} />
      
      {showForm && (
        <ProductForm
          product={editingProduct}
          onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct}
          onCancel={() => {
            setShowForm(false);
            setEditingProduct(null);
          }}
        />
      )}

      <Dashboard
        products={products}
        onAddProduct={() => setShowForm(true)}
        onEdit={handleEditProduct}
        onDelete={handleDeleteProduct}
      />
    </div>
  );
}

export default App;
