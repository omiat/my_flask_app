

// Function to load sections like header and footer
async function loadSection(url, elementId) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error loading ${url}`);
        }
        const text = await response.text();
        document.getElementById(elementId).innerHTML = text;
    } catch (error) {
        console.error('Error loading section:', error);
    }
}
   // Filter cards based on search input Help Center.
   function filterCards() {
    const searchInput = document.getElementById('searchBar').value.toLowerCase();
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        const title = card.querySelector('h3').innerText.toLowerCase();
        const description = card.querySelector('p').innerText.toLowerCase();
        if (title.includes(searchInput) || description.includes(searchInput)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}

// Help center Ends

function makeH1Clickable() {
    var header = document.getElementById('logo-id');
    if (header) {
        header.addEventListener('click', function() {
            window.location.href = '/'; // URL to navigate to
        });
    }
}

// Call the function once the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    makeH1Clickable();
});

// Slideshow function encapsulated in its own scope
(function() {
    let slideIndex = 0;
    const slides = document.getElementsByClassName("mySlides");

    // Function to show slides
    function showSlides() {
        // Hide all slides
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        
        // Increment slide index
        slideIndex++;
        if (slideIndex > slides.length) {
            slideIndex = 1; // Reset to the first slide
        }

        // Show the current slide
        slides[slideIndex - 1].style.display = "block";

        // Change slide every 5 seconds
        setTimeout(showSlides, 5000);
    }

    // Start the slideshow on page load
    document.addEventListener("DOMContentLoaded", function() {
        showSlides();
    });
})();

(function() {
    let slideIndex = 0;

    // Show the initial slide
    showSlides();

    function showSlides() {
        const slides = document.querySelectorAll('.testimonial');
        slides.forEach((slide, index) => {
            slide.style.display = index === slideIndex ? 'block' : 'none';
        });
    }

    // Change slide based on direction
    window.changeSlide = function(n) {
        const slides = document.querySelectorAll('.testimonial');
        slideIndex = (slideIndex + n + slides.length) % slides.length; // Wrap around
        showSlides();
    };

    // Optional: Auto-slide every 5 seconds
    setInterval(() => changeSlide(1), 5000);
})();
const videoBaseURL = "{{ url_for('admin_bp.static', filename='uploads') }}";
class ProjectPage {
    constructor(videosPerPage, totalVideos, imagePath, videoBaseURL) {
        this.videosPerPage = videosPerPage;
        this.totalVideos = totalVideos;
        this.currentPage = 1;
        this.imagePath = imagePath; // Path to images
        this.videoBaseURL = videoBaseURL; // Path to video files

        // Cache DOM elements
        this.videoGrid = document.getElementById('videoGrid');
        this.paginationInfo = document.getElementById('pageInfo');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.gridViewBtn = document.getElementById('gridViewBtn');
        this.listViewBtn = document.getElementById('listViewBtn');

        // Bind event listeners
        this.bindEvents();

        // Initial render
        this.renderVideos();
    }

    renderVideos() {
        this.videoGrid.innerHTML = ''; // Clear existing cards
        const start = (this.currentPage - 1) * this.videosPerPage;
        const end = Math.min(start + this.videosPerPage, this.totalVideos);

        for (let i = start; i < end; i++) {
            const videoCard = document.createElement('div');
            videoCard.className = 'video-card';
            videoCard.innerHTML = `
                <video width="220" height="150" controls>
                    <source src="${this.videoBaseURL}/background_video${i + 1}.mp4" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
                <h3>Video Title ${i + 1}</h3>
                <p>Short description of the video content.</p>
            `;
            this.videoGrid.appendChild(videoCard);
        }
        this.updatePagination();
    }

    // Other methods (changePage, toggleView, updatePagination) remain the same
}

// Instantiate the ProjectPage class with desired parameters
document.addEventListener('DOMContentLoaded', () => {
    new ProjectPage(100, 250, "{{ url_for('admin_bp.static', filename='') }}", videoBaseURL);
});


(function() {
    // Function to handle plan selection and pricing update
    function updatePlanPrices() {
        // Get all the dropdowns for plan duration
        const planDurationDropdowns = document.querySelectorAll('.plan-duration');
        
        // Iterate over each dropdown and set up event listeners
        planDurationDropdowns.forEach(dropdown => {
            dropdown.addEventListener('change', function() {
                // Get the selected plan (e.g., 'basic', 'pro', 'enterprise')
                const planType = this.getAttribute('data-plan');
                
                // Get the selected duration (e.g., 'monthly', 'quarterly', 'yearly')
                const selectedDuration = this.value;
                
                // Update the price based on the selected plan and duration
                const priceElement = document.getElementById(`${planType}-price`);
                const price = document.getElementById(`${planType}-${selectedDuration}-price`).value;
                
                // Update the displayed price
                priceElement.textContent = price;
            });
        });
    }

    // Initialize the function to make sure it's applied on page load
    document.addEventListener('DOMContentLoaded', updatePlanPrices);
})();

// Function to handle navigation toggle logic
function setupMenuToggle() {
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.querySelector('.ul-divider');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            console.log('Menu toggle clicked'); // Debug log
        });
    } else {
        console.warn('Menu toggle or nav menu not found in the DOM.');
    }
}

// Initialize all necessary JavaScript logic once the DOM has loaded
document.addEventListener('DOMContentLoaded', function () {
    // Load the header and footer dynamically
    loadSection('/header', 'header-container');
    loadSection('/footer', 'footer-container');

    // Setup the menu toggle functionality
    setupMenuToggle();
});



function VideodropArea() {
   
  }
  
  // Initialize the video upload functionality
  VideodropArea();

  
// Function to handle button clicks for video and audio options
function handleButtonClick(inputId, checkboxId, event) {
    // Prevent the default action of the button
    event.preventDefault();

    // Get the input container and checkbox elements
    const inputContainer = document.getElementById(inputId);
    const checkbox = document.getElementById(checkboxId);

    // Hide all other input containers in the same section
    const allInputContainers = document.querySelectorAll('.inputContainer');
    allInputContainers.forEach(container => {
        if (container !== inputContainer) {
            container.style.display = 'none'; // Hide other containers
            const relatedCheckbox = container.querySelector('input[type="checkbox"]');
            if (relatedCheckbox) relatedCheckbox.checked = false; // Uncheck other checkboxes
            
            // Also hide the URL input field
            const relatedURLInput = container.querySelector('input[type="text"]');
            if (relatedURLInput) {
                relatedURLInput.style.display = 'none'; // Hide the URL input field
                relatedURLInput.value = ''; // Clear the URL input field
            }
        }
    });

    // Toggle the visibility of the selected input container
    if (inputContainer.style.display === 'none' || inputContainer.style.display === '') {
        inputContainer.style.display = 'block'; // Show the input container
        checkbox.checked = true; // Check the checkbox

        // Show the URL input field
        const urlInput = inputContainer.querySelector('input[type="text"]');
        if (urlInput) {
            urlInput.style.display = 'block'; // Show the URL input field
        }
    } else {
        inputContainer.style.display = 'none'; // Hide the input container
        checkbox.checked = false; // Uncheck the checkbox

        // Hide the URL input field
        const urlInput = inputContainer.querySelector('input[type="text"]');
        if (urlInput) {
            urlInput.style.display = 'none'; // Hide the URL input field
            urlInput.value = ''; // Clear the URL input field
        }
    }
}

// Function to preview the selected media
function previewMedia(previewId, inputElement) {
    const mediaElement = document.getElementById(previewId);
    const file = inputElement.files[0];

    if (file) {
        const url = URL.createObjectURL(file);
        mediaElement.src = url;
        mediaElement.style.display = 'block'; // Show the media element
    }
}


// Function to toggle input fields based on checkbox state
function toggleInputFields(inputId) {
    const inputDiv = document.getElementById(inputId);
    inputDiv.style.display = inputDiv.style.display === 'none' ? 'block' : 'none';
}

// Function to handle saving as draft (Placeholder)
function saveAsDraft() {
    // Implement save as draft functionality
    alert("Form saved as draft!");
}

// Function to handle publishing the form (Placeholder)
function publish() {
    // Implement publish functionality
    alert("Form published!");
}


function initializeSidebarToggle() {
    const toggleButton = document.getElementById('toggle-button');
    if (toggleButton) {
        toggleButton.addEventListener('click', function() {
            const sidebar = document.getElementById('sidebar');
            if (sidebar) {
                sidebar.classList.toggle('collapsed');
            }
        });
    }
}

// Call the function to initialize the event listener
initializeSidebarToggle();


function setupAudioUpload() {
    document.getElementById('musicFile').addEventListener('change', function(event) {
        const audioPlayer = document.getElementById('audioPlayer');
        const fileNameDisplay = document.getElementById('fileName');
        const file = event.target.files[0];

        if (file) {
            // Create a URL for the uploaded file
            const fileURL = URL.createObjectURL(file);

            // Set the audio player's source to the uploaded file's URL
            audioPlayer.src = fileURL;

            // Show the audio player
            audioPlayer.style.display = 'block';

            // Display the name of the uploaded file
            fileNameDisplay.textContent = `Uploaded File: ${file.name}`;
            fileNameDisplay.style.display = 'block'; // Show the file name
        } else {
            // Hide the file name if no file is selected
            fileNameDisplay.style.display = 'none';
            audioPlayer.style.display = 'none';
        }
    });
}

// Call the function to set up the audio upload listener
setupAudioUpload();

