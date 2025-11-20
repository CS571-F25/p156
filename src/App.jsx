import React, { useEffect, useState } from 'react';
import './App.css'
import { HashRouter, Route, Routes } from 'react-router';


import ReWorkeDayLayout from './components/structural/ReWorkeDayLayout'
import ReWorkeDayHome from './components/pages/ReWorkeDayHome'
import NoMatch from './components/pages/NoMatch'
import ReWorkeDayLogin from './components/auth/ReWorkeDayLogin'
import ReWorkeDayRegister from './components/auth/ReWorkeDayRegister'
import ReWorkeDayLogout from './components/auth/ReWorkeDayLogout'

import OpenRoles from './components/pages/OpenRoles';
import SubmittedApplications from './components/pages/SubmittedApplications';
import About from './components/pages/About';
import CreatePosting from './components/pages/CreatePosting';
import RecruitmentHome from './components/pages/RecruitmentHome';


function App() {

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<ReWorkeDayLayout />}>
          <Route index element={<ReWorkeDayHome />} />
          <Route path="/login" element={<ReWorkeDayLogin />}></Route>
          <Route path="/register" element={<ReWorkeDayRegister />}></Route>
          <Route path="/logout" element={<ReWorkeDayLogout />}></Route>
          <Route path="/openroles" element={<OpenRoles />}></Route>
          <Route path="/submitted" element={<SubmittedApplications />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="*" element={<NoMatch />} />
        </Route>
        <Route path="/recruitment" element={<ReWorkeDayLayout />}>
          <Route path="/recruitment/home" element={<RecruitmentHome/>}/>
          <Route path="/recruitment/create" element={<CreatePosting/>}/>
        </Route>
      </Routes>
    </HashRouter>
  )
}

export default App
