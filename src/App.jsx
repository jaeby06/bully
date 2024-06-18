import React from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import Signup from './components/Signup'
import Header from './components/Header'
import Dashboard from './components/Dashboard'
import Patients from './components/Patients'
import Appointments from './components/Appointments'
import PatientsTable from './components/PatientsTable'
import Staff from './components/Staff'
import StaffTable from './components/StaffTable'
import Nok from './components/Nok'
import Requisitions from './components/Requisitions'
import RequisitionsTable from './components/RequisitionsTable'
import PharmaceuticalSupplyTable from './components/PharmaceuticalTable'
import InPatients from './components/InPatients'


function App() {


  return (
    <div className='App'>
      <Router>
        <Header />
        <Routes>
          <Route path="/" Component={Login} />
          <Route path="/login" Component={Login} />
          <Route path="/signup" Component={Signup} />
          <Route path="/dashboard" Component={Dashboard} />
          <Route path="/patients" Component={Patients} />
          <Route path="/appointments" Component={Appointments} />
          <Route path="/ptable" Component={PatientsTable} />
          <Route path="/staff" Component={Staff} />
          <Route path="/stable" Component={StaffTable} />
          <Route path="/nok" Component={Nok} />
          <Route path="/requisition" Component={Requisitions} />
          <Route path="/rtable" Component={RequisitionsTable} />
          <Route path="/phtable" Component={PharmaceuticalSupplyTable} />
          <Route path="/inpatients" Component={InPatients} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
