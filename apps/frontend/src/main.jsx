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
//ADD FUND
import CryptoFundComponent from "./components/payment/Crypto.jsx"
// ADMIN
import UserManageComponent from "./components/manage/component/User.jsx"
import CategoryManageComponent from "./components/manage/component/Category.jsx"
import RoleManageComponent from "./components/manage/component/Role.jsx"
import LicenseManageComponent from "./components/manage/component/License.jsx"
import FileManageComponent from "./components/manage/component/File.jsx"
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
          <Route path='files' element={<FileManageComponent />}></Route>
        </Route>
        <Route path='add-fund'>
          <Route index element={<CryptoFundComponent/>}></Route>
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
