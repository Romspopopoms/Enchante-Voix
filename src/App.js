import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ArticleProvider } from './ArticleContext';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Analytics } from "@vercel/analytics/react"
import { AuthProvider } from './AuthContext';

import Home from './pages/Home';
import Activites from './pages/Activites';
import Tarifs from './pages/Tarifs';  
import APropos from './pages/APropos';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import ArticlePage from './pages/ArticlesPage';
import AdminPage from './pages/AdminPage';
import AnalysePage from './pages/AnalysePage';

const App = () => {
  return (
    <AuthProvider>
      <ArticleProvider>
        <Router>
          <div className="relative flex flex-col xl:gap-y-12 w-full">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/activites" element={<Activites />} />
              <Route path="/tarifs" element={<Tarifs />} />
              <Route path="/a-propos" element={<APropos />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/Admin" element={<AdminPage />} />
              <Route path="/ajout-articles" element={<ArticlePage />} />
              <Route path="/analyse" element={<AnalysePage />} />

              {/* Ajoutez d'autres routes selon vos besoins */}
            </Routes>
            <Footer className="absolute bottom-0 w-full" />
            <SpeedInsights />
            <Analytics />
          </div>
        </Router>
      </ArticleProvider>
    </AuthProvider>
  );
}

export default App;
