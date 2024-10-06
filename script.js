const searchForm = document.querySelector('#recipe-form');
const searchResultDiv = document.querySelector('.search-result');
let searchQuery = '';
const APP_ID = 'ec9dd0ca';
const APP_KEY = 'c6f723f772f817b6ca77fac95a981bde';

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const input = e.target.querySelector('input').value.trim();
  if (input) {
    searchQuery = input;
    fetchAPI();
  }
});

async function fetchAPI() {
  const baseURL = `https://api.edamam.com/search?q=${encodeURIComponent(searchQuery)}&app_id=${APP_ID}&app_key=${APP_KEY}`;
  
  try {
    const response = await fetch(baseURL);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    generateHTML(data.hits);
  } catch (error) {
    console.error("Error fetching the recipes:", error);
    searchResultDiv.innerHTML = `<p class="error">An error occurred while fetching the recipes. Please try again later.</p>`;
  }
}

function generateHTML(results) {
  if (results.length === 0) {
    searchResultDiv.innerHTML = `<p class="no-results">No recipes found for "${searchQuery}".</p>`;
    return;
  }

  let generatedHTML = '';
  results.forEach(result => {
    generatedHTML += `
      <div class="item">
        <img src="${result.recipe.image}" alt="${result.recipe.label}">
        <div class="flex-container">
          <h1 class="title">${result.recipe.label}</h1>
          <a class="view-button" href="${result.recipe.url}" target="_blank">View Recipe</a>
        </div>
        <p class="item-data">Calories: ${result.recipe.calories.toFixed(0)}</p>
      </div>
    `;
  });
  searchResultDiv.innerHTML = generatedHTML;
}
