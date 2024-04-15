import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Activites from './pages/Activites';
import Tarifs from './pages/Tarifs';  
import APropos from './pages/APropos';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

const App = () => {
  return (
    <Router>
    <div className="flex flex-col xl:gap-y-12 w-full">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/activites" element={<Activites />} />
          <Route path="/tarifs" element={<Tarifs />} />
          <Route path="/a-propos" element={<APropos />} />
          {/* Ajoutez d'autres routes selon vos besoins */}
        </Routes>
        <Footer />
    </div>
    </Router>
  );
}

export default App;