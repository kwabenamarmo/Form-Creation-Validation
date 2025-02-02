async function fetchUserData() {
    const apiUrl = 'https://jsonplaceholder.typicode.com/users';
    const dataContainer = document.getElementById('api-data');

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {  // Check for HTTP errors (e.g., 404, 500)
            throw new Error(`HTTP error! status: ${response.status}`); // Throw an error for non-2xx responses
        }
        const users = await response.json();

        dataContainer.innerHTML = ''; // Clear loading message

        const userList = document.createElement('ul');

        users.forEach(user => {
            const listItem = document.createElement('li');
            listItem.textContent = user.name;
            userList.appendChild(listItem);
        });

        dataContainer.appendChild(userList);

    } catch (error) {
        dataContainer.innerHTML = ''; // Clear loading message
        dataContainer.textContent = 'Failed to load user data.';
        console.error("Error fetching data:", error); // Log the error for debugging
    }
}

document.addEventListener('DOMContentLoaded', fetchUserData);


// Example of another function (can be placed anywhere in the script)
function greetUser(userName) {
  console.log(`Hello, ${userName}!`);
}

// Example of how to call the new function (e.g., after the data is loaded)
document.addEventListener('DOMContentLoaded', async () => { // Using async inside the event handler
    await fetchUserData(); // Wait for data to load before greeting

    const firstUser = document.querySelector('#api-data ul li:first-child'); // Select the first user
    if (firstUser) { // Check if a user was actually loaded
        const firstUserName = firstUser.textContent;
        greetUser(firstUserName);
    }
});