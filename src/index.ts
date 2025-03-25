import { View } from './view/view';
import { Services } from './services/services';
import { Controller } from './controller/controller';

new Controller(new Services(), new View());

// addUser(): User[] {
//     const addForm = document.getElementById('addForm');
//     const container = document.getElementById('containerId');

//     if (!addForm || !container) {
//         console.error('Required elements not found');
//         return [];
//     }

//     const formElement = addForm as HTMLFormElement;
// formElement.style.zIndex = '1';
// container.style.opacity = '0.2';

//     const users: User[] = [];

    // const submitHandler = (e: SubmitEvent) => {
    //     e.preventDefault();
    //     const data = new FormData(formElement);

    //     // Extract user data from form
    //     const newUser: User = {
    //         id: Date.now(), // Simple unique ID generation
    //         name: data.get('name') as string || '',
    //         email: data.get('email') as string || ''
    //         // Add other properties as needed
    //     };

//         // Validate user data
// if (!newUser.name || !newUser.email) {
//             console.error('Name and email are required');
//             return;
//         }

//         // Add user to the array
//         users.push(newUser);

//         // Optional: Log the new user
//         console.log('New user added:', newUser);

//         // Optional: Reset the form
//         formElement.reset();

//         // Optional: Update UI or perform additional actions
//         updateUserDisplay(users);
//     };

//     // Add event listener only once
//     formElement.addEventListener('submit', submitHandler);

//     return users;
// }

// // Optional helper function to update user display
// function updateUserDisplay(users: User[]) {
//     const userListElement = document.getElementById('userList');
//     if (!userListElement) return;

//     // Clear existing list
//     userListElement.innerHTML = '';

//     // Create list items for each user
//     users.forEach(user => {
//         const listItem = document.createElement('li');
// listItem.textContent = `${user.name} (${user.email})`;
//         userListElement.appendChild(listItem);
//     });
