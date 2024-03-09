import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import ErrorModal from '../ErrorModal';

const RecipeDetails = () => {
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState(null);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  const apiKey = process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY;

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const response = await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`);
        if (!response.ok) {
          throw new Error('Sorry, we have reached the usage limit for today. Please try again later.');
        }
        const data = await response.json();
        setRecipe(data);
      } catch (error) {
        setError(error.message);
        setShowErrorModal(true);
        console.error('Error fetching recipe details:', error);
      }
    };

    if (id) {
      fetchRecipeDetails();
    }
  }, [id, apiKey]);

  const closeModal = () => {
    setShowErrorModal(false);
    router.push('/');
  };

  if (!recipe && !error) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-100 font-roboto">
      {recipe && (
        <>
          <h2 className="text-3xl font-semibold mb-4 text-center">{recipe.title}</h2>
          <div className="flex flex-wrap items-center justify-center">
            <img src={recipe.image} alt={recipe.title} className="w-full md:w-1/2 lg:w-1/3 rounded-md shadow-lg mb-4 md:mr-8" />
            <div className="w-full md:w-1/2 lg:w-2/3">
              <p className="text-lg mb-4" dangerouslySetInnerHTML={{ __html: recipe.summary }} />
            </div>
          </div>
        </>
      )}
      {showErrorModal && (
        <ErrorModal message={error} onClose={closeModal} />
      )}
    </div>
  );
};

export default RecipeDetails;
