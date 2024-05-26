const apiUrl = 'http://localhost:3000/person';
const authUrl = 'http://localhost:3000/user';

document.getElementById('sign-in-form').addEventListener('submit', async function (e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {};
    formData.forEach((value, key) => { data[key] = value });

    const response = await fetch(`${authUrl}/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    const result = await response.json();
    console.log('Login response:', result);
    
    if (result.token) {
        localStorage.setItem('token', result.token);
        localStorage.setItem('username', result.result.username);
        document.getElementById('sign-in-form').reset();
        document.getElementById('login-alert').classList.add('d-none');
        document.getElementById('login-success-alert').classList.remove('d-none');
        setTimeout(() => {
            document.getElementById('login-success-alert').classList.add('d-none');
        }, 1500);
        const signInModal = bootstrap.Modal.getInstance(document.getElementById('signInModal'));
        setTimeout(() => {
            signInModal.hide();
        }, 1500);
        // Update navbar with user's name and logout button
        document.getElementById('navbar-user').textContent = `Hello, ${localStorage.getItem('username')}`;
        document.getElementById('sign-in').classList.add('d-none');
        document.getElementById('sign-up').classList.add('d-none');
        document.getElementById('logout').classList.remove('d-none');
    } else {
        document.getElementById('login-alert').classList.remove('d-none');
    }
});

document.getElementById('logout').addEventListener('click', function () {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    document.getElementById('navbar-user').textContent = '';
    document.getElementById('sign-in').classList.remove('d-none');
    document.getElementById('sign-up').classList.remove('d-none');
    document.getElementById('logout').classList.add('d-none');
});

document.getElementById('sign-up-form').addEventListener('submit', async function (e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {};
    formData.forEach((value, key) => { data[key] = value });
    console.log('Sign Up data:', data);

    const response = await fetch(`${authUrl}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    const result = await response.json();
    console.log('Sign Up response:', result);
    console.log('Sign Up response status:', response);
    if (response.status === 201 && response.ok) {
        document.getElementById('sign-up-form').reset();
        document.getElementById('signup-alert').classList.add('d-none');
        document.getElementById('signup-success-alert').classList.remove('d-none');
        setTimeout(() => {
            document.getElementById('signup-success-alert').classList.add('d-none');
        }, 1500);
        const signUpModal = bootstrap.Modal.getInstance(document.getElementById('signUpModal'));
        setTimeout(() => {
            signUpModal.hide();
        }, 1500);
    } else {
        document.getElementById('signup-alert').classList.remove('d-none');
    }
});



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
    console.log('Persons:', persons);
    console.log('Persons:', persons.persons);
    const personArr = persons.persons;
    const container = document.getElementById('persons-container');
    container.innerHTML = '';
    personArr.forEach(person => {
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