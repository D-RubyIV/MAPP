import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Route, Routes } from 'react-router-dom'
import HomeComponent from './component/HomeComponent.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Routes>
      <Route path='' element={<HomeComponent />}></Route>
    </Routes>
  </React.StrictMode>,
)
