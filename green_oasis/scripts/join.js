// Join Form Functionality
document.addEventListener('DOMContentLoaded', () => {
    const joinForm = document.getElementById('join-form');
    
    // Load persisted form data from Local Storage
    const savedData = JSON.parse(localStorage.getItem('joinFormData'));
    if (savedData) {
        Object.keys(savedData).forEach(key => {
            const input = joinForm.elements[key];
            if (input) input.value = savedData[key];
        });
    }

    // Save form data to Local Storage on input
    joinForm.addEventListener('input', () => {
        const formData = {
            fname: joinForm.elements['fname'].value,
            lname: joinForm.elements['lname'].value,
            email: joinForm.elements['email'].value,
            experience: joinForm.elements['experience'].value,
            message: joinForm.elements['message'].value
        };
        localStorage.setItem('joinFormData', JSON.stringify(formData));
    });

    // Handle form submission
    joinForm.addEventListener('submit', (e) => {
        // Clear local storage after successful submission
        localStorage.removeItem('joinFormData');
    });
});
