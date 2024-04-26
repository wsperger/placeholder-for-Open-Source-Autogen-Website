let tutorials = [];  // This will hold our tutorial data
let currentPage = 1;
const recordsPerPage = 5;

// Fetch tutorials from JSON
function loadTutorials() {
    fetch('../Data/tutorials.json')
        .then(response => response.json())
        .then(data => {
            tutorials = data;
            changePage(1);  // Load the first page initially
        })
        .catch(error => console.error('Error loading the tutorials:', error));
}

// Function to change the page
function changePage(page) {
    const tbody = document.getElementById('tutorialsTable').getElementsByTagName('tbody')[0];
    tbody.innerHTML = '';

    if (page < 1) page = 1;
    if (page > numPages()) page = numPages();

    for (let i = (page-1) * recordsPerPage; i < (page * recordsPerPage) && i < tutorials.length; i++) {
        let row = tbody.insertRow();
        row.className = 'tutorial-entry';

        // Create a cell for the text content
        let textCell = row.insertCell(0);
        textCell.className = 'text-content';
        textCell.innerHTML = `
            <div class="tutorial-title"><strong>${tutorials[i].title}</strong></div>
            <div class="tutorial-description">${tutorials[i].description}</div>
            <div class="tutorial-brief-intro">${tutorials[i].briefIntro}</div>
        `;

        // Create a cell for the video
        let videoCell = row.insertCell(1);
        videoCell.className = 'video-content';
        videoCell.innerHTML = `<iframe width="560" height="315" src="${tutorials[i].youtubeUrl}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
    }
    document.getElementById("pageInfo").innerHTML = `${currentPage} / ${numPages()}`;
    currentPage = page;
}




// Calculate the total number of pages
function numPages() {
    return Math.ceil(tutorials.length / recordsPerPage);
}

// Go to the previous page
function previousPage() {
    if (currentPage > 1) {
        currentPage--;
        changePage(currentPage);
    }
}

// Go to the next page
function nextPage() {
    if (currentPage < numPages()) {
        currentPage++;
        changePage(currentPage);
    }
}

function populateCategories() {
    const allCategories = new Set(tutorials.map(tutorial => tutorial.category));
    const categoryDropdown = document.getElementById('categoryFilter');
    
    // Clear existing options except for the first one
    while (categoryDropdown.options.length > 1) {
        categoryDropdown.remove(1);
    }

    // Create and append the new options
    allCategories.forEach(category => {
        let option = new Option(category, category);
        categoryDropdown.add(option);
    });
}


// Ensure the nextPage and previousPage functions properly reference the updated currentPage
document.addEventListener('DOMContentLoaded', loadTutorials);  // Load tutorials when the DOM is fully loaded
