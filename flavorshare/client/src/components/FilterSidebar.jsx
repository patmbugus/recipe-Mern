import React from 'react';
import { Filter, X, Clock, Globe, Leaf, Zap } from 'lucide-react';

const FilterSidebar = ({ filters, onFilterChange, onClearFilters }) => {
  const cuisines = [
    'Italian', 'Mexican', 'Chinese', 'Indian', 'Japanese', 'French', 
    'Thai', 'Greek', 'Spanish', 'American', 'Mediterranean', 'Korean',
    'Vietnamese', 'Lebanese', 'Turkish', 'Moroccan', 'Ethiopian'
  ];

  const dietaryTypes = [
    { value: 'Vegan', label: 'Vegan', icon: Leaf, color: 'text-green-600' },
    { value: 'Vegetarian', label: 'Vegetarian', icon: Leaf, color: 'text-emerald-600' },
    { value: 'Gluten-Free', label: 'Gluten-Free', icon: Zap, color: 'text-blue-600' },
    { value: 'None', label: 'No Restrictions', icon: Globe, color: 'text-gray-600' }
  ];

  const prepTimeRanges = [
    { value: '15', label: '15 min or less', icon: Zap },
    { value: '30', label: '30 min or less', icon: Clock },
    { value: '45', label: '45 min or less', icon: Clock },
    { value: '60', label: '1 hour or less', icon: Clock },
    { value: '120', label: '2 hours or less', icon: Clock }
  ];

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'prepTime', label: 'Quickest First' },
    { value: 'popularity', label: 'Most Popular' }
  ];

  const handleFilterChange = (filterType, value) => {
    onFilterChange({ [filterType]: value });
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== '' && value !== 'newest');

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Filter className="h-5 w-5 text-primary-600" />
          <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        </div>
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="text-sm text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Cuisine Filter */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
          <Globe className="h-4 w-4 mr-2 text-gray-500" />
          Cuisine
        </h4>
        <div className="space-y-2 max-h-32 overflow-y-auto">
          {cuisines.map((cuisine) => (
            <label key={cuisine} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="cuisine"
                value={cuisine}
                checked={filters.cuisine === cuisine}
                onChange={(e) => handleFilterChange('cuisine', e.target.value)}
                className="h-4 w-4 text-primary-600 border-gray-300 focus:ring-primary-500"
              />
              <span className="text-sm text-gray-700">{cuisine}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Dietary Type Filter */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
          <Leaf className="h-4 w-4 mr-2 text-gray-500" />
          Dietary Preferences
        </h4>
        <div className="space-y-2">
          {dietaryTypes.map(({ value, label, icon: Icon, color }) => (
            <label key={value} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="dietaryType"
                value={value}
                checked={filters.dietaryType === value}
                onChange={(e) => handleFilterChange('dietaryType', e.target.value)}
                className="h-4 w-4 text-primary-600 border-gray-300 focus:ring-primary-500"
              />
              <Icon className={`h-4 w-4 ${color}`} />
              <span className="text-sm text-gray-700">{label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Prep Time Filter */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
          <Clock className="h-4 w-4 mr-2 text-gray-500" />
          Preparation Time
        </h4>
        <div className="space-y-2">
          {prepTimeRanges.map(({ value, label, icon: Icon }) => (
            <label key={value} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="prepTime"
                value={value}
                checked={filters.prepTime === value}
                onChange={(e) => handleFilterChange('prepTime', e.target.value)}
                className="h-4 w-4 text-primary-600 border-gray-300 focus:ring-primary-500"
              />
              <Icon className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-700">{label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Sort Options */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-900 mb-3">Sort By</h4>
        <div className="space-y-2">
          {sortOptions.map(({ value, label }) => (
            <label key={value} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="sortBy"
                value={value}
                checked={filters.sortBy === value}
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                className="h-4 w-4 text-primary-600 border-gray-300 focus:ring-primary-500"
              />
              <span className="text-sm text-gray-700">{label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="pt-4 border-t border-gray-200">
          <h4 className="text-sm font-medium text-gray-900 mb-3">Active Filters</h4>
          <div className="flex flex-wrap gap-2">
            {filters.cuisine && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                {filters.cuisine}
                <button
                  onClick={() => handleFilterChange('cuisine', '')}
                  className="ml-1 hover:text-primary-900"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            {filters.dietaryType && filters.dietaryType !== 'None' && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                {filters.dietaryType}
                <button
                  onClick={() => handleFilterChange('dietaryType', '')}
                  className="ml-1 hover:text-green-900"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            {filters.prepTime && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                ≤{filters.prepTime} min
                <button
                  onClick={() => handleFilterChange('prepTime', '')}
                  className="ml-1 hover:text-blue-900"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterSidebar;