# FlavorShare Client Documentation

## Overview

FlavorShare is a recipe-sharing platform that allows users to create, share, search, and filter recipes. The client-side application is built using React and provides a responsive user interface for seamless interaction.

## Features

- User authentication (register, login)
- Create, edit, and delete recipes
- Upload images for recipes
- Search recipes by name, ingredients, or tags
- Filter recipes by cuisine type, preparation time, and dietary preferences
- Real-time comments on recipes
- Likes and favorites system
- Responsive design for mobile and desktop

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm (Node Package Manager)

### Installation

1. Clone the repository:

   ```
   git clone <repository-url>
   ```

2. Navigate to the client directory:

   ```
   cd flavorshare/client
   ```

3. Install the dependencies:

   ```
   npm install
   ```

### Running the Application

To start the development server, run:

```
npm start
```

The application will be available at `http://localhost:3000`.

### Building for Production

To create a production build, run:

```
npm run build
```

The production files will be generated in the `build` directory.

## Folder Structure

```
client
├── public
│   └── index.html          # Main HTML file
├── src
│   ├── components          # Reusable components
│   ├── context             # Context API for state management
│   ├── pages               # Page components
│   ├── styles              # CSS styles (Tailwind)
│   ├── App.jsx             # Main application component
│   └── index.js            # Entry point of the application
├── package.json             # Project dependencies and scripts
└── README.md                # Client documentation
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.