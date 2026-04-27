import { useLocation } from 'react-router-dom';
import Header from './components/Layouts/Header.jsx';
import Footer from './components/Layouts/Footer.jsx';
import AppRoutes from './routes/AppRoutes.jsx';

function App() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <>
      {!isAdmin && <Header />}
      <AppRoutes />
      {!isAdmin && <Footer />}
    </>
  );
}

export default App;
