
function restart(){
    fetch('countries.json')
        .then(response => response.json())
        .then(countries => {
            const select = document.getElementById('country');
            const business = document.getElementById('companyCountry');
            countries.forEach(country => {
                const option = document.createElement('option');
                const companyOption = document.createElement('option');
                option.value = country.code;
                option.textContent = country.name;
                companyOption.value = country.code;
                companyOption.textContent = country.name;
                select.appendChild(option);
                business.appendChild(companyOption);
            });
        })
        .catch(error => console.error('Error loading countries:', error));
}
            
    function validateFields(page) {
    const formPage = document.getElementById(`page${page}`);
    const inputs = formPage.querySelectorAll('input[required]');
    let valid = true;

    inputs.forEach(input => {
        if (!input.value) {
            valid = false;
            input.classList.add('error'); // Optional: Add an error class for styling
        } else {
            input.classList.remove('error'); // Remove error class if valid
        }
    });

    return valid;
}

async function submitForm() {
    if (!validateFields(1) || !validateFields(2)) { // Assuming Page 2 is the last page
        alert("Please fill in all required fields.");
        restart();
        event.preventDefault()
        return; // Stop function if validation fails
    }
    event.preventDefault()
    const formData = new FormData(document.getElementById('multiPageForm'));
    const data = Object.fromEntries(formData.entries());
    console.log(data)
    try {
        const response = await fetch('/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            const result = await response.text();
        alert("Successfully submitted");
        } else {
            throw new Error('Network response was not ok');
        }
    } catch (error) {
        alert("error:", error);
    }
}

async function testSubmission() {
    const url = 'http://localhost:3000/submit'; // Change to your GET endpoint

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Submissions:', data);
        })
        .catch((error) => {
            console.error('Error fetching submissions:', error);
        });
}