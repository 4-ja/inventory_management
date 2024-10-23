import AppController from "./components/AppController";
import React from 'react'
import ExampleUser from "./components/ExampleDB/ExampleUser";
import UsersExample from "./components/ExampleDB/UsersExample";


const App = () => {
  return (
    <div classname="app">
    <AppController/>
    <UsersExample/>
    </div>
  );
}

export default App