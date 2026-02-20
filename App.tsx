import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import About from './components/About';
import Resume from './components/Resume';
import Footer from './components/Footer';
import CategoryPage from './components/CategoryPage';

const App: React.FC = () => {
  // Added 'about' to the view state
  const [view, setView] = useState<'home' | 'portfolio' | 'category' | 'about'>('home');
  // State for filtering the main portfolio view by specific category (e.g., Design, Video)
  const [portfolioCategory, setPortfolioCategory] = useState<string | undefined>(undefined);
  
  const [categoryProps, setCategoryProps] = useState({ filterType: '', filterValue: '', title: '' });

  const navigateToCategory = (type: string, value: string, title: string) => {
    setCategoryProps({ filterType: type, filterValue: value, title });
    setView('category');
    window.scrollTo(0, 0);
  };

  // Unified navigation handler
  const handleNavigation = (href: string) => {
    const targetId = href.replace('#', '');

    if (targetId === 'work') {
      setView('portfolio');
      setPortfolioCategory(undefined); // Show all
      window.scrollTo(0, 0);
    } else if (targetId.startsWith('portfolio/')) {
        // Handle dropdown links like #portfolio/Design
        const category = targetId.split('/')[1];
        setView('portfolio');
        setPortfolioCategory(decodeURIComponent(category));
        window.scrollTo(0, 0);
    } else if (targetId === 'contact') {
      // Contact is in Footer, available on all pages. Just scroll to it.
      const element = document.getElementById('contact');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (targetId === 'about') {
      setView('about');
      window.scrollTo(0, 0);
    } else if (targetId === 'resume') {
        setView('about');
        setTimeout(() => {
          const element = document.getElementById('resume');
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
    } else {
      // Default to Home (Logo click)
      setView('home');
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar onNavigate={handleNavigation} />
      
      {view === 'home' && (
        <>
          <Hero onNavigate={handleNavigation} />
        </>
      )}

      {view === 'portfolio' && (
        <main className="max-w-6xl mx-auto px-4 md:px-10 pt-24 animate-fade-in min-h-screen">
          <Projects 
            onNavigate={navigateToCategory} 
            activeCategory={portfolioCategory}
          />
        </main>
      )}

      {view === 'about' && (
        <main className="max-w-6xl mx-auto px-4 md:px-10 pt-24 animate-fade-in min-h-screen">
          <About />
          <Resume />
        </main>
      )}

      {view === 'category' && (
        <main className="max-w-6xl mx-auto px-4 md:px-10">
          <CategoryPage 
            filterType={categoryProps.filterType}
            filterValue={categoryProps.filterValue}
            title={categoryProps.title}
            onBack={() => {
                // Return to portfolio and set the active category to restore book position
                setView('portfolio');
                setPortfolioCategory(categoryProps.filterValue);
                window.scrollTo(0, 0);
            }}
          />
        </main>
      )}
      
      <Footer />
    </div>
  );
};

export default App;