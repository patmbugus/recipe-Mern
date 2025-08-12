import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import toast from 'react-hot-toast';
import { ChefHat, Plus, X, ArrowLeft, Save, Loader2 } from 'lucide-react';

const EditRecipe = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [ingredients, setIngredients] = useState(['']);
  const [steps, setSteps] = useState(['']);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Removed unused cuisine variable

  const cuisines = [
    'Italian', 'Mexican', 'Chinese', 'Indian', 'Japanese', 'French', 
    'Thai', 'Greek', 'Spanish', 'American', 'Mediterranean', 'Korean',
    'Vietnamese', 'Lebanese', 'Turkish', 'Moroccan', 'Ethiopian'
  ];

  const dietaryTypes = [
    { value: 'None', label: 'No Restrictions' },
    { value: 'Vegan', label: 'Vegan' },
    { value: 'Vegetarian', label: 'Vegetarian' },
    { value: 'Gluten-Free', label: 'Gluten-Free' }
  ];

  // Fetch recipe data
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await api.get(`/api/recipes/${id}`);
        const recipe = response.data.recipe;
        
        // Check if user owns this recipe
        if (recipe.createdBy !== user?.id) {
          toast.error('You can only edit your own recipes');
          navigate('/');
          return;
        }

        // Set form data
        reset({
          title: recipe.title,
          description: recipe.description,
          cuisine: recipe.cuisine,
          dietaryType: recipe.dietaryType,
          prepTime: recipe.prepTime,
        });

        // Set ingredients and steps
        setIngredients(recipe.ingredients || ['']);
        setSteps(recipe.steps || ['']);
        
        setIsFetching(false);
      } catch (error) {
        toast.error('Failed to fetch recipe');
        navigate('/');
      }
    };

    if (user) {
      fetchRecipe();
    }
  }, [id, user, navigate, reset]);

  const addIngredient = () => {
    setIngredients([...ingredients, '']);
  };

  const removeIngredient = (index) => {
    if (ingredients.length > 1) {
      setIngredients(ingredients.filter((_, i) => i !== index));
    }
  };

  const updateIngredient = (index, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };

  const addStep = () => {
    setSteps([...steps, '']);
  };

  const removeStep = (index) => {
    if (steps.length > 1) {
      setSteps(steps.filter((_, i) => i !== index));
    }
  };

  const updateStep = (index, value) => {
    const newSteps = [...steps];
    newSteps[index] = value;
    setSteps(newSteps);
  };

  const onSubmit = async (data) => {
    if (!user) {
      toast.error('Please log in to edit recipes');
      return;
    }

    // Filter out empty ingredients and steps
    const filteredIngredients = ingredients.filter(ingredient => ingredient.trim() !== '');
    const filteredSteps = steps.filter(step => step.trim() !== '');

    if (filteredIngredients.length === 0) {
      toast.error('Please add at least one ingredient');
      return;
    }

    if (filteredSteps.length === 0) {
      toast.error('Please add at least one step');
      return;
    }

    setIsLoading(true);
    try {
      const recipeData = {
        ...data,
        ingredients: filteredIngredients,
        steps: filteredSteps,
        prepTime: parseInt(data.prepTime),
      };

      await api.put(`/api/recipes/${id}`, recipeData);
      toast.success('Recipe updated successfully!');
      navigate(`/recipe/${id}`);
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to update recipe';
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <ChefHat className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Authentication Required</h2>
          <p className="text-gray-600">Please log in to edit recipes.</p>
        </div>
      </div>
    );
  }

  if (isFetching) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 text-primary-600 animate-spin mx-auto mb-4" />
          <p className="text-lg text-gray-600">Loading recipe...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-6">
            <button
              onClick={() => navigate(`/recipe/${id}`)}
              className="p-2 rounded-lg bg-white shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors duration-200"
            >
              <ArrowLeft className="h-5 w-5 text-gray-600" />
            </button>
            <div className="flex items-center space-x-3">
              <div className="bg-white p-3 rounded-full shadow-lg">
                <ChefHat className="h-8 w-8 text-primary-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Edit Recipe</h1>
                <p className="text-gray-600">Update your culinary creation</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recipe Form */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="title" className="form-label">
                  Recipe Title *
                </label>
                <input
                  id="title"
                  type="text"
                  {...register('title', { required: 'Recipe title is required' })}
                  className={`input-field ${errors.title ? 'border-red-500 focus:ring-red-500' : ''}`}
                  placeholder="e.g., Spaghetti Carbonara"
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="cuisine" className="form-label">
                  Cuisine *
                </label>
                <select
                  id="cuisine"
                  {...register('cuisine', { required: 'Cuisine is required' })}
                  className={`input-field ${errors.cuisine ? 'border-red-500 focus:ring-red-500' : ''}`}
                >
                  <option value="">Select a cuisine</option>
                  {cuisines.map((cuisine) => (
                    <option key={cuisine} value={cuisine}>
                      {cuisine}
                    </option>
                  ))}
                </select>
                {errors.cuisine && (
                  <p className="mt-1 text-sm text-red-600">{errors.cuisine.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="prepTime" className="form-label">
                  Preparation Time (minutes) *
                </label>
                <input
                  id="prepTime"
                  type="number"
                  min="1"
                  {...register('prepTime', { 
                    required: 'Preparation time is required',
                    min: { value: 1, message: 'Time must be at least 1 minute' }
                  })}
                  className={`input-field ${errors.prepTime ? 'border-red-500 focus:ring-red-500' : ''}`}
                  placeholder="30"
                />
                {errors.prepTime && (
                  <p className="mt-1 text-sm text-red-600">{errors.prepTime.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="dietaryType" className="form-label">
                  Dietary Type
                </label>
                <select
                  id="dietaryType"
                  {...register('dietaryType')}
                  className="input-field"
                >
                  {dietaryTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="form-label">
                Description *
              </label>
              <textarea
                id="description"
                rows="4"
                {...register('description', { required: 'Description is required' })}
                className={`input-field ${errors.description ? 'border-red-500 focus:ring-red-500' : ''}`}
                placeholder="Describe your recipe, what makes it special, and any tips for making it..."
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
              )}
            </div>

            {/* Ingredients */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <label className="form-label">Ingredients *</label>
                <button
                  type="button"
                  onClick={addIngredient}
                  className="btn-secondary text-sm"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Ingredient
                </button>
              </div>
              <div className="space-y-3">
                {ingredients.map((ingredient, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <input
                      type="text"
                      value={ingredient}
                      onChange={(e) => updateIngredient(index, e.target.value)}
                      className="input-field flex-1"
                      placeholder={`Ingredient ${index + 1}`}
                    />
                    {ingredients.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeIngredient(index)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Steps */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <label className="form-label">Instructions *</label>
                <button
                  type="button"
                  onClick={addStep}
                  className="btn-secondary text-sm"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Step
                </button>
              </div>
              <div className="space-y-3">
                {steps.map((step, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center font-semibold text-sm">
                      {index + 1}
                    </div>
                    <textarea
                      value={step}
                      onChange={(e) => updateStep(index, e.target.value)}
                      className="input-field flex-1"
                      rows="2"
                      placeholder={`Step ${index + 1}`}
                    />
                    {steps.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeStep(index)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200 mt-2"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => navigate(`/recipe/${id}`)}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary flex items-center"
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                ) : (
                  <Save className="h-4 w-4 mr-2" />
                )}
                {isLoading ? 'Updating Recipe...' : 'Update Recipe'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditRecipe;