import React, { useState, useRef, useEffect } from 'react';
import { Search, X, TrendingUp, Clock, Star } from 'lucide-react';

const SearchBar = ({ onSearch, placeholder = "Search recipes, ingredients, or cuisines..." }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);

  // Popular search suggestions
  const suggestions = [
    { text: 'Italian Pasta', icon: TrendingUp, category: 'Popular' },
    { text: 'Quick 30-min meals', icon: Clock, category: 'Quick' },
    { text: 'Vegan recipes', icon: Star, category: 'Trending' },
    { text: 'Chicken dishes', icon: TrendingUp, category: 'Popular' },
    { text: 'Desserts', icon: Star, category: 'Sweet' },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm.trim());
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion.text);
    onSearch(suggestion.text);
    setShowSuggestions(false);
  };

  const clearSearch = () => {
    setSearchTerm('');
    onSearch('');
    setShowSuggestions(false);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setShowSuggestions(value.length > 0);
    
    if (value.length === 0) {
      onSearch('');
    }
  };

  return (
    <div className="relative" ref={searchRef}>
      <form onSubmit={handleSubmit} className="relative">
        <div className={`relative transition-all duration-200 ${
          isFocused ? 'ring-2 ring-primary-500 ring-offset-2' : ''
        }`}>
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          
          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            onFocus={() => {
              setIsFocused(true);
              if (searchTerm.length > 0) setShowSuggestions(true);
            }}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-primary-500 transition-colors duration-200 text-gray-900 placeholder-gray-500 bg-white shadow-sm"
          />
          
          {searchTerm && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
            >
              <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
            </button>
          )}
          
          <button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-1.5 rounded-lg transition-colors duration-200 text-sm font-medium"
          >
            Search
          </button>
        </div>
      </form>

      {/* Search Suggestions */}
      {showSuggestions && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-200 z-50 max-h-80 overflow-y-auto">
          <div className="p-2">
            {/* Recent searches */}
            {searchTerm.length > 0 && (
              <div className="mb-3">
                <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Search Results
                </div>
                <div className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors duration-200">
                  "{searchTerm}" in recipes
                </div>
                <div className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors duration-200">
                  "{searchTerm}" in ingredients
                </div>
              </div>
            )}

            {/* Popular suggestions */}
            <div>
              <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Popular Searches
              </div>
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200 text-left"
                >
                  <suggestion.icon className="h-4 w-4 text-gray-400" />
                  <span className="flex-1">{suggestion.text}</span>
                  <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
                    {suggestion.category}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;