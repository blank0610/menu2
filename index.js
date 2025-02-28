const menuData = {
    Chinese: [
        { name: "Kung Pao Chicken", recipe: "Chicken, peanuts, vegetables, soy sauce." },
        { name: "Fried Rice", recipe: "Rice, vegetables, eggs, soy sauce." },
        { name: "Spring Rolls", recipe: "Vegetables wrapped in rice paper." },
    ],
    Japanese: [
        { name: "Sushi", recipe: "Rice, seaweed, fish, vegetables." },
        { name: "Ramen", recipe: "Noodles, broth, meat, vegetables." },
        { name: "Tempura", recipe: "Battered and fried vegetables or seafood." },
    ],
    HongKong: [],
    Italy: [],
};

// Define background images for each cuisine
const backgroundImages = {
    Chinese: "url('cnbg6.jpg')",
    Japanese: "url('jpbg2.jpg')",
    HongKong: "url('hkbg2.jpg')",
    Italy: "url(italy3.jpg)"
};

const urlParams = new URLSearchParams(window.location.search);
const style = urlParams.get('style');

// Change the header text and background image
document.getElementById('menuHeader').innerText = style + ' Menu';
document.body.style.backgroundImage = backgroundImages[style] || "none"; // Set background image

const menuContainer = document.getElementById('menuContainer');
const addPageButton = document.getElementById('addpage'); // Select the add page button

if (menuData[style]) {
    menuData[style].forEach(item => {
        const div = document.createElement('div'); // Use 'div' instead of 'ul'
        div.className = 'menu-item';
        div.innerHTML = `
            <h3>${item.name}
                <button class="edit" onclick="editItem('${item.name}')">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="delete" onclick="deleteItem('${item.name}')">
                    <i class="fas fa-trash"></i>
                </button>
            </h3>
            <p>${item.recipe}</p>
            <button class="addcalendar" onclick="addToCalendar('${item.name}')">Add to Calendar</button>
        
            
            `;

        // Insert the new food box before the add page button
        menuContainer.insertBefore(div, addPageButton);
    });
} else {
    document.getElementById('menuHeader').innerText = 'Menu Not Found'; // Error handling
}

const addFoodForm = document.getElementById('addFoodForm');

function addpage() {
    // Show the hidden form
    addFoodForm.classList.remove('hidden');
}

function submitFood() {
    const foodName = document.getElementById('foodName').value;
    const foodRecipe = document.getElementById('foodRecipe').value;

    // Check if the user provided values
    if (foodName && foodRecipe) {
        // Add the new food item to the menu data
        menuData[style].push({ name: foodName, recipe: foodRecipe });

        // Clear the input fields
        document.getElementById('foodName').value = '';
        document.getElementById('foodRecipe').value = '';

        // Hide the form again
        addFoodForm.classList.add('hidden');

        // Refresh displayed menu items
        displayMenuItems();
    } else {
        alert("Please enter both food name and recipe.");
    }
}

function cancelAdd() {
    // Hide the form without adding an item
    addFoodForm.classList.add('hidden');

    // Clear the input fields
    document.getElementById('foodName').value = '';
    document.getElementById('foodRecipe').value = '';
}

const calendarList = document.getElementById('calendarList');

function addToCalendar(food) {
    const listItem = document.createElement('li');
    listItem.textContent = food;
    calendarList.appendChild(listItem);
}

// Placeholder functions for edit and delete
function editItem(name) {
    console.log('Edit item:', name);
}

function deleteItem(name) {
    console.log('Delete item:', name);
}
