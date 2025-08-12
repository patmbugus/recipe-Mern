import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Users, Star } from 'lucide-react';

const RecipeCard = ({ recipe }) => {
  const {
    _id,
    title,
    description,
    images,
    prepTime,
    cuisine,
    dietaryType,
    createdBy,
    likes = [],
    rating = 0
  } = recipe;

  const defaultImage = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop';
  const imageUrl = images && images.length > 0 ? images[0] : defaultImage;

  const formatTime = (minutes) => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  };

  const getDietaryBadgeColor = (type) => {
    const colors = {
      'Vegan': 'bg-green-100 text-green-800',
      'Vegetarian': 'bg-emerald-100 text-emerald-800',
      'Gluten-Free': 'bg-blue-100 text-blue-800',
      'None': 'bg-gray-100 text-gray-800'
    };
    return colors[type] || colors['None'];
  };

  return (
    <Link to={`/recipe/${_id}`} className="group">
      <div className="card overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.target.src = defaultImage;
            }}
          />
          
          {/* Overlay with quick info */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {formatTime(prepTime)}
                </span>
                <span className="flex items-center">
                  <Star className="h-4 w-4 mr-1 text-yellow-400" />
                  {rating.toFixed(1)}
                </span>
              </div>
            </div>
          </div>

          {/* Dietary badge */}
          {dietaryType !== 'None' && (
            <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium ${getDietaryBadgeColor(dietaryType)}`}>
              {dietaryType}
            </div>
          )}

          {/* Cuisine badge */}
          <div className="absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium bg-white/90 text-gray-800 font-medium">
            {cuisine}
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors duration-200">
            {title}
          </h3>
          
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {description}
          </p>

          {/* Meta information */}
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center space-x-3">
              <span className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                {formatTime(prepTime)}
              </span>
              <span className="flex items-center">
                <Users className="h-4 w-4 mr-1 text-red-500" />
                {likes.length}
              </span>
            </div>
            
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-1" />
              <span className="truncate max-w-20">
                {createdBy?.username || 'Anonymous'}
              </span>
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center mt-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(rating) 
                      ? 'text-yellow-400 fill-current' 
                      : i < rating 
                        ? 'text-yellow-400' 
                        : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500 ml-2">
              {rating > 0 ? rating.toFixed(1) : 'No ratings'}
            </span>
          </div>
        </div>

        {/* Hover effect indicator */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 to-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
      </div>
    </Link>
  );
};

export default RecipeCard;