
const recipeForm = document.getElementById('recipe-form');
const recipeList = document.getElementById('recipe-list');
const searchBar = document.getElementById('search-bar');


document.addEventListener('DOMContentLoaded', cargarRecetas);

recipeForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const recipe = datosRecetaFormulario();
    if (recipe) guardarReceta(recipe);
});


searchBar.addEventListener('input', searchRecipes);


function datosRecetaFormulario() {
    const name = document.getElementById('recipe-name').value.trim();
    const ingredients = document.getElementById('recipe-ingredients').value.trim();
    const instructions = document.getElementById('recipe-instructions').value.trim();
    const category = document.getElementById('recipe-category').value;
    const time = document.getElementById('cooking-time').value;

    if (!name || !ingredients || !instructions || !time) {
        alert('Por favor, completa todos los campos.');
        return null;
    }

    return { name, ingredients, instructions, category, time };
}


function guardarReceta(recipe) {
    const recipes = getRecipesFromStorage();
    recipes.push(recipe);
    localStorage.setItem('recipes', JSON.stringify(recipes));
    listarRecetas();
    recipeForm.reset();  
}


function getRecipesFromStorage() {
    return JSON.parse(localStorage.getItem('recipes')) || [];
}


function cargarRecetas() {
    listarRecetas();
}


function listarRecetas() {
    const recipes = getRecipesFromStorage();
    recipeList.innerHTML = '';  

    recipes.forEach((recipe, index) => {
        const recipeCard = document.createElement('div');
        recipeCard.className = 'recipe-card';
        recipeCard.innerHTML = `
            <h3>${recipe.name}</h3>
            <p><strong>Ingredientes:</strong> ${recipe.ingredients}</p>
            <p><strong>Instrucciones:</strong> ${recipe.instructions}</p>
            <p><strong>Categoría:</strong> ${recipe.category}</p>
            <p><strong>Tiempo de Cocción:</strong> ${recipe.time} minutos</p>
            <button onclick="editarReceta(${index})">Editar</button>
            <button onclick="eliminarReceta(${index})">Eliminar</button>
        `;
        recipeList.appendChild(recipeCard);
    });
}


function eliminarReceta(index) {
    const recipes = getRecipesFromStorage();
    recipes.splice(index, 1);  
    localStorage.setItem('recipes', JSON.stringify(recipes));
    listarRecetas();
}



function editarReceta(index) {
    const recipes = getRecipesFromStorage();
    const recipe = recipes[index];
    
    document.getElementById('recipe-name').value = recipe.name;
    document.getElementById('recipe-ingredients').value = recipe.ingredients;
    document.getElementById('recipe-instructions').value = recipe.instructions;
    document.getElementById('recipe-category').value = recipe.category;
    document.getElementById('cooking-time').value = recipe.time;
    
    
    recipes.splice(index, 1);
    localStorage.setItem('recipes', JSON.stringify(recipes));
}


function searchRecipes() {
    const query = searchBar.value.toLowerCase();
    const recipes = getRecipesFromStorage();

    const filteredRecipes = recipes.filter(recipe => 
        recipe.name.toLowerCase().includes(query) ||
        recipe.ingredients.toLowerCase().includes(query) ||
        recipe.instructions.toLowerCase().includes(query)
    );

    displayFilteredRecipes(filteredRecipes);
}


function displayFilteredRecipes(recipes) {
    recipeList.innerHTML = '';  

    recipes.forEach((recipe, index) => {
        const recipeCard = document.createElement('div');
        recipeCard.className = 'recipe-card';
        recipeCard.innerHTML = `
            <h3>${recipe.name}</h3>
            <p><strong>Ingredientes:</strong> ${recipe.ingredients}</p>
            <p><strong>Instrucciones:</strong> ${recipe.instructions}</p>
            <p><strong>Categoría:</strong> ${recipe.category}</p>
            <p><strong>Tiempo de Cocción:</strong> ${recipe.time} minutos</p>
            <button onclick="editarReceta(${index})">Editar</button>
            <button onclick="eliminarReceta(${index})">Eliminar</button>
        `;
        recipeList.appendChild(recipeCard);
    });
}

