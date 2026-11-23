import { useState } from 'react';
import DairyCatalog from './components/DairyCatalog';
import CheckoutPage from './components/CheckoutPage';
import Login from './components/Login';
import JaiShreeGanesh from './components/JaiShreeGanesh';

function App() {
  // Default view 'farm' rakha hai taaki main page Ayansh Dairy Farm khule
  const [activeView, setActiveView] = useState('farm');
  const [checkoutCart, setCheckoutCart] = useState({});

  const handleNavigateAuth = (mode) => {
    if (mode === 'login') {
      setActiveView('login');
    } else {
      // Agar alag Register component ho toh yahan switch kar sakte hain
      setActiveView('login');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '30px', fontFamily: 'Arial', color: 'goldenrod', padding: '0 16px' }}>
      {/* Farm Logo */}
      <img
        src="/FarmLogo.png"
        alt="Ayansh Dairy Farm Logo"
        style={{
          display: 'block',
          width: '150px',
          height: '150px',
          objectFit: 'contain',
          margin: '0 auto'
        }}
      />
      <h1>Ayansh Dairy Farm</h1>

      {/* Simple navigation buttons */}
      <div style={{ marginBottom: '20px' }}>
        <button
          type="button"
          onClick={() => setActiveView('farm')}
          style={{ padding: '8px 14px', marginRight: '8px', cursor: 'pointer' }}
        >
          Dairy Catalog
        </button>

        <button
          type="button"
          onClick={() => setActiveView('login')}
          style={{ padding: '8px 14px', marginRight: '8px', cursor: 'pointer' }}
        >
          Login
        </button>

        <button
          type="button"
          onClick={() => setActiveView('game')}
          style={{ padding: '8px 14px', cursor: 'pointer' }}
        >
          Puzzle Game
        </button>
      </div>

      <hr style={{ maxWidth: '600px', margin: '0 auto 20px auto' }} />

      {/* Active view ke hisaab se component dikhana */}
      {activeView === 'farm' && (
        <DairyCatalog
          onProceedToCheckout={(selectedCart) => {
            setCheckoutCart(selectedCart);
            setActiveView('checkout');
          }}
        />
      )}

      {activeView === 'checkout' && (
        <CheckoutPage
          cart={checkoutCart}
          onBackToCatalog={() => setActiveView('farm')}
          onNavigateAuth={handleNavigateAuth}
        />
      )}

      {activeView === 'login' && <Login />}
      {activeView === 'game' && <JaiShreeGanesh />}
    </div>
  );
}

export default App;