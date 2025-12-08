import React, { useState } from 'react';
import './App.css'
import { HashRouter, Route, Routes } from 'react-router';

import ReWorkeDayLayout from './components/structural/ReWorkeDayLayout'
import ReWorkeDayHome from './components/pages/ReWorkeDayHome'
import NoMatch from './components/pages/NoMatch'
import About from './components/pages/About';

import OpenRoles from './components/pages/OpenRoles';

import ReWorkeDayLogin from './components/auth/ReWorkeDayLogin'
import ReWorkeDayRegister from './components/auth/ReWorkeDayRegister'
import ReWorkeDayLogout from './components/auth/ReWorkeDayLogout'


import ApplicantHome from './components/pages/applicant/ApplicantHome';
import SubmittedApplications from './components/pages/applicant/SubmittedApplications';
import Apply from './components/pages/applicant/Apply';

import CreatePosting from './components/pages/recruitment/CreatePosting';
import RecruitmentHome from './components/pages/recruitment/RecruitmentHome';

import Constants from './Constants';

import { SignedInStatus } from './components/contexts/SignedInStatus';

function App() {
  return (
    <SignedInStatus>
      <HashRouter>
        <Routes>
          <Route path="/" element={<ReWorkeDayLayout />}>
            <Route index element={<ReWorkeDayHome />} />
            <Route path="/login" element={<ReWorkeDayLogin />}></Route>
            <Route path="/register" element={<ReWorkeDayRegister />}></Route>
            <Route path="/logout" element={<ReWorkeDayLogout />}></Route>
            <Route path="/openroles" element={<OpenRoles />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="*" element={<NoMatch />} />
          </Route>
          <Route path="/recruitment" element={<ReWorkeDayLayout />}>
            <Route path="/recruitment/home" element={<RecruitmentHome/>}/>
            <Route path="/recruitment/create" element={<CreatePosting/>}/>
          </Route>
          <Route path="/applicant" element={<ReWorkeDayLayout />}>
            <Route path="/applicant/home" element={<ApplicantHome/>}/>
            <Route path="/applicant/submitted" element={<SubmittedApplications />}/>
            <Route path="/applicant/apply" element={<Apply/>}/>
          </Route>          
        </Routes>
      </HashRouter>
    </SignedInStatus>
  )
}

export default App
