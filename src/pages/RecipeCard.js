import React from 'react';
import Link from 'next/link';

const RecipeCard = ({ recipe }) => {
    if (!recipe) {
        return null; 
    }
  return (
    <div className="border border-gray-200 rounded-md p-4">
      <h2 className="text-xl font-semibold mb-2">{recipe.title}</h2>
      <img src={recipe.image} alt={recipe.title} className="w-full h-auto mb-2" />
      <p>{recipe.summary}</p>
      <Link href={`/recipes/${recipe.id}`}>
        <span className="text-blue-500 block mt-2">View Recipe</span>
      </Link>
    </div>
  );
};

export default RecipeCard;
