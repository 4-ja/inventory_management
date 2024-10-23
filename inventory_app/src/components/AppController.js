import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import ExampleUser from './ExampleDB/ExampleUser'
import UsersExample from './ExampleDB/UsersExample'
import LoginForm from './LoginForm'

const AppController = () => {
  return (
    <div>
      <BrowserRouter>
          <Routes>
          <Route path ='/users' element ={<LoginForm/>}></Route>
          <Route path ='/users' element ={<UsersExample/>}></Route>
          <Route path ='/usersGet' element ={<ExampleUser/>}></Route>
          </Routes>
      </BrowserRouter>
    </div>
  )
}

export default AppController