import React, { useState, useEffect, useRef } from 'react';
import RecipeCard from './RecipeCard';
import ErrorModal from './ErrorModal';
import SearchBar from './SearchBar';

const RecipeFinder = () => {
  const [keyword, setKeyword] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState('');
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errorCount, setErrorCount] = useState(0); 
  const [typing, setTyping] = useState(false); 

  const apiKey = process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY;
  const resultsPerPage = 10;

  const fetchRecipes = async (page) => {
    try {
      const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${keyword}&apiKey=${apiKey}&number=${resultsPerPage}&offset=${(page - 1) * resultsPerPage}`);
      if (!response.ok) {
        throw new Error('Sorry, we have reached the usage limit for today. Please try again later.');
      }
      const data = await response.json();
      setRecipes(prevRecipes => [...prevRecipes, ...data.results]);
      setCurrentPage(page + 1);
      setLoading(false);
      setErrorCount(0); 
    } catch (error) {
      setError(error.message);
      //console.error('Error fetching data:', error);
      setLoading(false);
      if (errorCount < 2 || typing) { 
        setShowErrorModal(true);
        setErrorCount(prevCount => prevCount + 1);
      }
    }
  };

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || loading) {
      return;
    }
    setLoading(true);
    fetchRecipes(currentPage);
  };

  const handleTyping = () => {
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
    }, 2000); 
  };

  useEffect(() => {
    fetchRecipes(currentPage);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPage]);

  useEffect(()=>{
    fetchRecipes(currentPage);
  },[typing])

  const clearKeyword = () => {
    setKeyword('');
    setCurrentPage(1);
    setRecipes([]);
  };

  const closeModal = () => {
    setShowErrorModal(false);
  };

  return (
    <div className="container px-8 md:mx-auto py-8">
      <h1 className="text-3xl font-semibold mb-4">Recipe Finder</h1>
      <SearchBar keyword={keyword} setKeyword={setKeyword} clearKeyword={clearKeyword} onTyping={handleTyping} />
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {showErrorModal && (
        <ErrorModal message={error} onClose={closeModal} />
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {recipes && recipes.map(recipe => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
      </div>
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default RecipeFinder;
