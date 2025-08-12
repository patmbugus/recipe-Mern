import React, { useState } from 'react';
import { useQuery } from 'react-query';
import api from '../utils/api';
import RecipeCard from '../components/RecipeCard';
import SearchBar from '../components/SearchBar';
import FilterSidebar from '../components/FilterSidebar';
import { Loader2, ChefHat, TrendingUp, Clock } from 'lucide-react';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    cuisine: '',
    dietaryType: '',
    prepTime: '',
    sortBy: 'newest'
  });

  // Fetch recipes with search and filters
  const { data: recipes = [], isLoading, error, refetch } = useQuery(
    ['recipes', searchTerm, filters],
    async () => {
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      if (filters.cuisine) params.append('cuisine', filters.cuisine);
      if (filters.dietaryType) params.append('dietaryType', filters.dietaryType);
      if (filters.prepTime) params.append('prepTime', filters.prepTime);
      if (filters.sortBy) params.append('sortBy', filters.sortBy);
      
      const response = await api.get(`/api/recipes?${params.toString()}`);
      return response.data.recipes || [];
    },
    {
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    }
  );

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const clearFilters = () => {
    setFilters({
      cuisine: '',
      dietaryType: '',
      prepTime: '',
      sortBy: 'newest'
    });
    setSearchTerm('');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 text-primary-600 animate-spin mx-auto mb-4" />
          <p className="text-lg text-gray-600">Loading delicious recipes...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <ChefHat className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Oops! Something went wrong</h2>
          <p className="text-gray-600 mb-4">We couldn't load the recipes. Please try again.</p>
          <button 
            onClick={() => refetch()}
            className="btn-primary"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-50 to-orange-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Discover & Share
            <span className="text-gradient block">Amazing Recipes</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Join our community of food lovers. Find new recipes, share your favorites, 
            and explore cuisines from around the world.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary text-lg px-8 py-3">
              <ChefHat className="inline h-5 w-5 mr-2" />
              Start Cooking
            </button>
            <button className="btn-secondary text-lg px-8 py-3">
              <TrendingUp className="inline h-5 w-5 mr-2" />
              Trending Recipes
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Filter Section */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="lg:w-1/4">
              <FilterSidebar 
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearFilters={clearFilters}
              />
            </div>
            <div className="lg:w-3/4">
              <SearchBar onSearch={handleSearch} />
              
              {/* Results Header */}
              <div className="flex items-center justify-between mt-6 mb-4">
                <div className="flex items-center space-x-2">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {searchTerm ? `Search Results for "${searchTerm}"` : 'All Recipes'}
                  </h2>
                  <span className="bg-primary-100 text-primary-800 text-sm font-medium px-3 py-1 rounded-full">
                    {recipes.length} recipes
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Clock className="h-4 w-4" />
                  <span>Sorted by {filters.sortBy}</span>
                </div>
              </div>

              {/* Recipes Grid */}
              {recipes.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {recipes.map(recipe => (
                    <RecipeCard key={recipe._id} recipe={recipe} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <ChefHat className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-gray-900 mb-2">No recipes found</h3>
                  <p className="text-gray-500 mb-6">
                    {searchTerm 
                      ? `No recipes match "${searchTerm}". Try adjusting your search or filters.`
                      : 'No recipes available. Be the first to add one!'
                    }
                  </p>
                  {searchTerm && (
                    <button 
                      onClick={clearFilters}
                      className="btn-secondary"
                    >
                      Clear Filters
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;