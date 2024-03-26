import React from 'react'
import {Routes, Route} from 'react-router-dom'

import './style/App.css'

import SignUp from './SignUp'
import SignIn from './SignIn'
import Profiles from './Profiles'
import AddSkill from './AddSkill'
import SkillView from './SkillView'

const App = () => {
  return(
    <Routes>
        <Route path='/' element={<SignUp/>}/>
        <Route path='/signin' element={<SignIn/>}/>
        <Route path='/profiles' element={<Profiles/>}/>
        <Route path='/addskill' element={<AddSkill/>}/>
        <Route path='/skill/:skillId' element={<SkillView/>}/>
    </Routes>
  )
}

export default App;