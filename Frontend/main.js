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
    document.getElementById('success-alert').classList.remove('d-none');
    setTimeout(() => {
        document.getElementById('success-alert').classList.add('d-none');
    }, 1500);
    document.getElementById('create-form').reset();
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
    document.getElementById('update-success-alert').classList.remove('d-none');
    setTimeout(() => {
        document.getElementById('update-success-alert').classList.add('d-none');
    }, 1500);
    document.getElementById('update-form').reset();
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
        <div class="container mt-5">
        <div class="card">
            <div class="card-header bg-primary text-white">
                Person Information
            </div>
            <div class="card-body">
                <table class="table table-bordered table-striped">
                    <tbody>
                        <tr>
                            <th scope="row">ID</th>
                            <td>${person._id}</td>
                        </tr>
                        <tr>
                            <th scope="row">Name</th>
                            <td>${person.name}</td>
                        </tr>
                        <tr>
                            <th scope="row">Email</th>
                            <td>${person.email}</td>
                        </tr>
                        <tr>
                            <th scope="row">Phone</th>
                            <td>${person.phone}</td>
                        </tr>
                        <tr>
                            <th scope="row">Address</th>
                            <td>${person.address}</td>
                        </tr>
                    </tbody>
                </table>
                <div class="d-flex justify-content-end">
                    <button class="btn btn-danger me-2" onclick="deletePerson('${person._id}')">Delete</button>
                    <button class="btn btn-warning" onclick="populateUpdateForm('${person._id}', '${person.name}', '${person.email}', '${person.phone}', '${person.address}')">Update</button>
                </div>
            </div>
        </div>
    </div>
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