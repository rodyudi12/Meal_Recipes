# FastRecipes

## Project Description
FastRecipes is a single-page web application (SPA) that allows users to search, explore, and save recipes from [TheMealDB API](https://www.themealdb.com/). Users can filter recipes by category, view detailed recipe instructions, and manage their favorite recipes in a personal dashboard. 
## Technologies Used
- Frontend: React, React Router, Context API, CSS
- API: [TheMealDB API](https://www.themealdb.com/api.php)
- Development Tools: Vite, JavaScript, CSS

## Setup and Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/fastrecipes.git
   cd fastrecipes

2. Install dependencies:
    npm install

3. Run the development server:
    npm run dev
    Open in browser at http://localhost:5173

## Available Routes and Features

### Routes 
1. /Home page with hero section and featured recipes
2. /recipes	Recipe search page with search bar and category filter
3. /recipe/:id	Recipe details page with ingredients, instructions, and save/remove favorites button
4. /dashboard	Dashboard showing all saved recipes with View and Remove buttons
5. 404 Not Found page

### Features

1. Search recipes by name
2. Filter recipes by category: Vegetarian, Chicken, Beef, Seafood, Dessert, All
3. View detailed recipe information
4. Save and remove recipes from favorites instantly
5. Responsive design for mobile, tablet, and desktop
6. Smooth SPA navigation using React Router

## API Documentation
1. The app uses TheMealDB API for recipe data. Key endpoints:
2. Search recipes by name: /search.php?s={query}
3. Filter recipes by category: /filter.php?c={category}
4. Get recipe details by ID: /lookup.php?i={id}
5. Get random recipes: /random.php
6. All API calls are handled in src/services/mealRecipesAPI.js.

### Screenshots
Home Page
![Home Page](assets/Home.png)
Recipe Search
![Recipe Search](assets/Recipes.png)
Recipe Details
![Recipe Details](assets/RecipeDetails.png)
Dashboard
![Dashboard](assets/Dashboard.png)
![Dashboard](assets/Dashboard_with_recipes.png)

### Known Issues
- The Header are adapting to the content, so if there are no content in the dashboard for example, the header will be smaller
- Some categories may return empty results due to API limitations
- Favorites are stored in memory via React Context; no persistent storage yet


### Future Enhancements
- Add persistent storage (localStorage)
- Implement user authentication for personal dashboards
- Enable pagination or infinite scroll for recipe results
- Advanced filtering (by cuisine, ingredients, dietary restrictions)

## Deployment

### Deploy with services like Vercel, Netlify, or GitHub Pages. Example using Vercel:
npm run build
vercel deploy

## Project Structure
src/
├── assets/             # Images and static files
├── components/         # Reusable components (Header, Footer, RecipeCard, LoadingSpinner)
├── contexts/           # Context API for favorites
├── pages/              # Pages (Home, RecipeSearch, RecipeDetails, Dashboard, NotFound)
├── services/           # API service functions
├── App.jsx             # Main App component with routing
├── main.jsx            # Entry point
└── index.css           # Global styles
