import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
// 
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import LoginComponent from './components/LoginComponent'
import MainComponent from './components/MainComponent.jsx'
import RootComponent from './components/RootComponent.jsx'
import LogoutComponet from './components/LogoutComponet.jsx'
import ManageComponent from './components/ManageComponet.jsx'
import HomeComponent from './components/HomeComponent.jsx'
// 
import AuthProvider from './provider/authProvider.jsx'
// ADMIN
import UserManageComponent from "./components/manager/component/User.jsx"
import CategoryManageComponent from "./components/manager/component/Category.jsx"
import RoleManageComponent from "./components/manager/component/Role.jsx"
import LicenseManageComponent from "./components/manager/component/License.jsx"
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootComponent />}>
      <Route path='/' element={<MainComponent />}>
        <Route path='/' element={<HomeComponent />}></Route>
        <Route path='manage' >
          <Route index element={<ManageComponent />}></Route>
          <Route path='users' element={<UserManageComponent />}></Route>
          <Route path='categories' element={<CategoryManageComponent />}></Route>
          <Route path='roles' element={<RoleManageComponent />}></Route>
          <Route path='licenses' element={<LicenseManageComponent />}></Route>
        </Route>
      </Route>
      <Route path='login' element={<LoginComponent />}></Route>
      <Route path='logout' element={<LogoutComponet />}></Route>
    </Route>
  )
)


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  </React.StrictMode>,
)
