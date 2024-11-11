document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".form");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const countryInput = document.getElementById("country");
    const travelDatesInput = document.getElementById("travel-dates");
    const numTravelersInput = document.getElementById("num-travelers");
    const consentCheckbox = document.getElementById("consent");

    form.addEventListener("submit", function (event) {
        // Initialize an array to store error messages
        const errors = [];

        // Validation for name (minimum length of 2 characters)
        if (nameInput.value.trim().length < 2) {
            errors.push("Name must be at least 2 characters long.");
        }

        // Validation for email (must be a valid email format)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
            errors.push("Please enter a valid email address.");
        }

        // Validation for country (must not be empty)
        if (countryInput.value.trim().length === 0) {
            errors.push("Please enter your country of origin.");
        }

        // Validation for travel dates
        const selectedDate = new Date(travelDatesInput.value);
        const currentDate = new Date();
        if (!travelDatesInput.value) {
            errors.push("Please select your travel dates.");
        } else if (selectedDate < currentDate) {
            errors.push("Travel dates cannot be in the past.");
        }

        // Validation for number of travelers
        const numTravelers = parseInt(numTravelersInput.value);
        if (!numTravelers || numTravelers < 1) {
            errors.push("Number of travelers must be at least 1.");
        }

        // Validation for attractions (at least one must be selected)
        const attractionsChecked = document.querySelectorAll('input[name="attractions"]:checked');
        if (attractionsChecked.length === 0) {
            errors.push("Please select at least one attraction you're interested in.");
        }

        // Validation for first-time visitor selection
        const firstTimeSelected = document.querySelector('input[name="first-time"]:checked');
        if (!firstTimeSelected) {
            errors.push("Please indicate if this is your first time visiting Tigray.");
        }

        // Validation for consent
        if (!consentCheckbox.checked) {
            errors.push("Please agree to be contacted with travel recommendations.");
        }

        // If there are errors, prevent form submission and display them
        if (errors.length > 0) {
            event.preventDefault(); // Prevent form submission
            
            // Create and show error messages in a more user-friendly way
            const existingErrorDiv = document.querySelector('.error-messages');
            if (existingErrorDiv) {
                existingErrorDiv.remove();
            }

            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-messages';
            errorDiv.style.color = 'red';
            errorDiv.style.marginBottom = '20px';
            errorDiv.style.padding = '10px';
            errorDiv.style.backgroundColor = '#fff3f3';
            errorDiv.style.border = '1px solid #ffcdd2';
            errorDiv.style.borderRadius = '4px';

            const errorList = document.createElement('ul');
            errors.forEach(error => {
                const li = document.createElement('li');
                li.textContent = error;
                errorList.appendChild(li);
            });

            errorDiv.appendChild(errorList);
            form.insertBefore(errorDiv, form.firstChild);

            // Scroll to the top of the form to show errors
            errorDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });

    // Real-time validation for email
    emailInput.addEventListener('input', function() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(this.value)) {
            this.style.borderColor = 'red';
        } else {
            this.style.borderColor = 'green';
        }
    });

    // Real-time validation for number of travelers
    numTravelersInput.addEventListener('input', function() {
        const value = parseInt(this.value);
        if (!value || value < 1) {
            this.style.borderColor = 'red';
        } else {
            this.style.borderColor = 'green';
        }
    });
});