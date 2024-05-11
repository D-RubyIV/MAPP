import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
// 
import { GoogleOAuthProvider } from '@react-oauth/google';
// 
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import AuthComponent from './components/AuthComponent'
import MainComponent from './components/MainComponent.jsx'
import RootComponent from './components/RootComponent.jsx'
import LogoutComponet from './components/LogoutComponet.jsx'
import ManageComponent from './components/ManageComponet.jsx'
import HomeComponent from './components/HomeComponent.jsx'
// 
import AuthProvider from './provider/authProvider.jsx'
//ADD FUND
import CryptoFundComponent from "./components/payment/Crypto.jsx"
import MethodPayComponent from "./components/payment/Method.jsx"
// 
import ProtectedRouter from './components/ProtectedRoute.jsx';
// ADMIN
import UserManageComponent from "./components/manage/component/User.jsx"
import CategoryManageComponent from "./components/manage/component/Category.jsx"
import RoleManageComponent from "./components/manage/component/Role.jsx"
import FileManageComponent from "./components/manage/component/File.jsx"
import ProductManageComponent from "./components/manage/component/Product.jsx"
import OrderManageComponent from "./components/manage/component/Order.jsx"
import VoucherManageComponent from "./components/manage/component/Voucher.jsx"
import OrderDetailManageComponent from "./components/manage/component/OrderDetail.jsx"
import NotFoundComponent from './components/NotFoundComponent.jsx'
import DetailProductComponent from './components/DetailProductComponent.jsx'
import UrlSearchComponent from './components/oauth/UrlSearchComponent.jsx';
import ProfileComponent from './components/ProfileComponent.jsx';
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='' element={<RootComponent />}>
      {/*  */}
      <Route path='' element={<ProtectedRouter />}>
        <Route path='' element={<HomeComponent />} />
        {/*  */}
        <Route path='manage' >
          <Route index element={<ManageComponent />}></Route>
          <Route path='users' element={<UserManageComponent />}></Route>
          <Route path='categories' element={<CategoryManageComponent />}></Route>
          <Route path='roles' element={<RoleManageComponent />}></Route>
          <Route path='files' element={<FileManageComponent />}></Route>
          <Route path='products' element={<ProductManageComponent />}></Route>
          <Route path='products/:userId' element={<DetailProductComponent />}></Route>
          <Route path='orders' element={<OrderManageComponent />}></Route>
          <Route path='order-details' element={<OrderDetailManageComponent />}></Route>
          <Route path='vouchers' element={<VoucherManageComponent />}></Route>
        </Route>
        {/*  */}
        <Route path='profile' element={<ProfileComponent />}></Route>
        {/*  */}
        <Route path='add-fund'>
          <Route index element={<MethodPayComponent />}></Route>
        </Route>
        {/*  */}
      </Route>
      {/*  */}
      <Route path='oauth' element={<UrlSearchComponent />}></Route>
      <Route path='auth' element={<AuthComponent />}></Route>
      <Route path='logout' element={<LogoutComponet />}></Route>
      <Route path='*' element={<NotFoundComponent />}></Route>

    </Route>
  )
)


ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <AuthProvider>
    <RouterProvider router={router}></RouterProvider>
  </AuthProvider>
  // {/* </React.StrictMode> */}
)
