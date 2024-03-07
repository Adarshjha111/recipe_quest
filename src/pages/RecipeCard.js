import React from 'react';

const RecipeCard = ({ recipe }) => {
  return (
    <div className="border border-gray-200 rounded-md p-4">
      <h2 className="text-xl font-semibold mb-2">{recipe.title}</h2>
      <img src={recipe.image} alt={recipe.title} className="w-full h-auto mb-2" />
      <p>{recipe.summary}</p>
      <a href={recipe.sourceUrl} className="text-blue-500 block mt-2" target="_blank" rel="noopener noreferrer">View Recipe</a>
    </div>
  );
};

export default RecipeCard;
