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
import InPatients from './components/InPatients'
import SupplyTable from './components/SupplyTable'
import InPatientsTable from './components/InPatientsTable'
import OutPatients from './components/OutPatients'
import OutPatientsTable from './components/OutPatientsTable'


function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={
            <>
              <Header />
              <Dashboard />
            </>
          } />
          <Route path="/patients" element={
            <>
              <Header />
              <Patients />
            </>
          } />
          <Route path="/appointments" element={
            <>
              <Header />
              <Appointments />
            </>
          } />
          <Route path="/ptable" element={
            <>
              <Header />
              <PatientsTable />
            </>
          } />
          <Route path="/staff" element={
            <>
              <Header />
              <Staff />
            </>
          } />
          <Route path="/stable" element={
            <>
              <Header />
              <StaffTable />
            </>
          } />
          <Route path="/nok" element={
            <>
              <Header />
              <Nok />
            </>
          } />
          <Route path="/requisition" element={
            <>
              <Header />
              <Requisitions />
            </>
          } />
          <Route path="/rtable" element={
            <>
              <Header />
              <RequisitionsTable />
            </>
          } />
          <Route path="/supplytable" element={
            <>
              <Header />
              <SupplyTable />
            </>
          } />
          <Route path="/inpatients" element={
            <>
              <Header />
              <InPatients />
            </>
          } />
          <Route path="/iptable" element={
            <>
              <Header />
              <InPatientsTable />
            </>
          } />
          <Route path="/outpatients" element={
            <>
              <Header />
              <OutPatients />
            </>
          } />
          <Route path="/optable" element={
            <>
              <Header />
              <OutPatientsTable />
            </>
          } />
        </Routes>
      </Router>
    </div>
  )
}

export default App
