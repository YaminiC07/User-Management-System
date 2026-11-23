
const apiUrl = "/api/users";

const userForm = document.getElementById("userForm");
const userTable = document.getElementById("userTable");

function getUsers() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(users => {
            userTable.innerHTML = "";

            users.forEach(user => {
                userTable.innerHTML += `
                    <tr>
                        <td>${user.id}</td>
                        <td>${user.name}</td>
                        <td>${user.email}</td>
                        <td>${user.phone}</td>
                        <td>
                            <button class="action-btn"
                                onclick="editUser(${user.id}, '${user.name}', '${user.email}', '${user.phone}')">
                                Edit
                            </button>

                            <button class="action-btn"
                                onclick="deleteUser(${user.id})">
                                Delete
                            </button>
                        </td>
                    </tr>
                `;
            });
        });
}

userForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const id = document.getElementById("userId").value;

    const user = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value
    };

    const method = id ? "PUT" : "POST";
    const url = id ? `${apiUrl}/${id}` : apiUrl;

    fetch(url, {
        method: method,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    .then(response => response.json())
    .then(() => {
        alert("User saved successfully!");
        userForm.reset();
        document.getElementById("userId").value = "";
        getUsers();
    });
});

function editUser(id, name, email, phone) {
    document.getElementById("userId").value = id;
    document.getElementById("name").value = name;
    document.getElementById("email").value = email;
    document.getElementById("phone").value = phone;
}

function deleteUser(id) {
    if (confirm("Are you sure you want to delete this user?")) {
        fetch(`${apiUrl}/${id}`, {
            method: "DELETE"
        })
        .then(() => {
            alert("User deleted successfully!");
            getUsers();
        });
    }
}

getUsers();
