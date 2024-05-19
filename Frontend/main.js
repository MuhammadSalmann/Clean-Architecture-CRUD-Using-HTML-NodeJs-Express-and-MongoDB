const apiUrl = 'http://localhost:3000/person';

document.getElementById('create-form').addEventListener('submit', async function (e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {};
    formData.forEach((value, key) => { data[key] = value });

    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    const result = await response.json();
    console.log('Create response:', result);
    fetchPersons();
});

document.getElementById('update-form').addEventListener('submit', async function (e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {};
    formData.forEach((value, key) => { data[key] = value });
    const id = document.getElementById('update-id').value;

    const response = await fetch(`${apiUrl}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    const result = await response.json();
    console.log('Update response:', result);
    fetchPersons();
});

async function fetchPersons() {
    const response = await fetch(apiUrl);
    const persons = await response.json();
    const container = document.getElementById('persons-container');
    container.innerHTML = '';
    persons.forEach(person => {
        const personDiv = document.createElement('div');
        personDiv.innerHTML = `
                    <p><strong>ID:</strong> ${person._id}</p>
                    <p><strong>Name:</strong> ${person.name}</p>
                    <p><strong>Email:</strong> ${person.email}</p>
                    <p><strong>Phone:</strong> ${person.phone}</p>
                    <p><strong>Address:</strong> ${person.address}</p>
                    <button onclick="deletePerson('${person._id}')">Delete</button>
                    <button onclick="populateUpdateForm('${person._id}', '${person.name}', '${person.email}', '${person.phone}', '${person.address}')">Update</button>
                    <hr>
                `;
        container.appendChild(personDiv);
    });
}

async function deletePerson(id) {
    const response = await fetch(`${apiUrl}/${id}`, {
        method: 'DELETE'
    });
    const result = await response.json();
    console.log('Delete response:', result);
    fetchPersons();
}

function populateUpdateForm(id, name, email, phone, address) {
    document.getElementById('update-id').value = id;
    document.getElementById('update-name').value = name;
    document.getElementById('update-email').value = email;
    document.getElementById('update-phone').value = phone;
    document.getElementById('update-address').value = address;
}

// Initial fetch
fetchPersons();