import React from 'react'
import {Routes, Route} from 'react-router-dom'

import './style/App.css'

import SignUp from './SignUp'
import SignIn from './SignIn'
import Skills from './Skills'
import Profiles from './Profiles'

const App = () => {
  return(
    <Routes>
        <Route path='/' element={<SignUp/>}/>
        <Route path='/signin' element={<SignIn/>}/>
        <Route path='/skills' element={<Skills/>}/>
        <Route path='/profiles' element={<Profiles/>}/>
        {/* <Route path='/elogin' element={<EmployeeLogin/>}/> */}
        {/* <Route path='/:restaurantId' element={<Restaurant/>}/> */}
        {/* <Route path='/order' element={<TakeOrder/>}/> */}
    </Routes>
  )
}

export default App;