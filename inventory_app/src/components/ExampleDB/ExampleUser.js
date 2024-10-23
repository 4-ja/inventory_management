import React, { useState, useEffect } from 'react';
import axios from 'axios';
 
 
function ExampleUser() {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:8000/api/getUsers")
        .then((response) => {
            console.log(response.data)
            setUsers(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
    }, []);

    const handleDeleteUser = (id) => {

        axios.delete(`http://localhost:8000/api/deleteUser/${id}`)

          .then(() => {

            setUsers(users.filter(user => user._id !== id));

          })

          .catch((error) => {

            console.log(error);

          });

      };


 
 
  return (
    <div>
      <h1>User List</h1>
        {users.map(user => (
         <li key={user._id}>
           {user.name}
           <button onClick={() => handleDeleteUser(user._id)}>Delete</button>
          </li>
        )    
    )}
    </div>
  )
}
 
export default ExampleUser;