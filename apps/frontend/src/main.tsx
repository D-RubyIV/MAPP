import ReactDOM from 'react-dom/client'
import './index.css'
import { Route, RouterProvider } from 'react-router-dom'
import DashBoardComponent from './component/dashboard/DashBoardComponent.tsx'
import { createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import RootComponent from './component/RootComponent.tsx'
import ManageComponent from './component/manage/ManageComponent.tsx'
import UserComponent from './component/manage/table/UserComponent.tsx'
import OrderComponent from './component/manage/table/OrderComponent.tsx'
import CategoryComponent from './component/manage/table/CategoryComponent.tsx'
import RoleComponent from './component/manage/table/RoleComponent.tsx'
import ProductComponent from './component/manage/table/ProductComponent.tsx'
import OrderDetailComponent from './component/manage/table/OrderDetailComponent.tsx'
import VoucherComponent from './component/manage/table/VoucherComponent.tsx'
import FileComponent from './component/manage/table/FileComponent.tsx'
import AuthComponent from './component/auth/AuthComponent.tsx'
import AuthProvider from './component/security/AuthProvider.tsx'
import ProtectRouter from './component/security/ProtectRouter.tsx'
import UrlSearchComponent from './component/auth/UrlSearchComponent.tsx'
import LogoutComponet from './component/auth/LogoutComponent.tsx'
import 'react-loading-skeleton/dist/skeleton.css'
import './language/I18Next.tsx'
import SettingComponent from './component/setting/SettingComponent.tsx'
import LicenseComponent from './component/manage/table/LicenseComponent.tsx'
import DetailProductComponent from './component/body/DetailProductComponent.tsx'
import StorangeComponent from './component/manage/table/StorangeComponent.tsx'
import NotFoundComponent from './component/common/NotFoundComponent.tsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='' element={<ProtectRouter/>} >
      <Route path='' element={<RootComponent />}>
        <Route path='' element={<DashBoardComponent />} />
        <Route path='manage'>
          <Route path='' element={<ManageComponent />} />
          <Route path='users' element={<UserComponent />} />
          <Route path='categories' element={<CategoryComponent />} />
          <Route path='products' element={<ProductComponent />} />
          <Route path='orders' element={<OrderComponent />} />
          <Route path='order-details' element={<OrderDetailComponent />} />
          <Route path='roles' element={<RoleComponent />} />
          <Route path='files' element={<FileComponent />} />
          <Route path='licenses' element={<LicenseComponent />} />
          <Route path='vouchers' element={<VoucherComponent />} />
          <Route path='storage' element={<StorangeComponent />} />
        </Route>
        <Route path='product/:id' element={<DetailProductComponent />} />
        <Route path='setting' element={<SettingComponent />} />
      </Route>
      <Route path='auth' element={<AuthComponent />} />
      <Route path='oauth' element={<UrlSearchComponent />} />
      <Route path='logout' element={<LogoutComponet />} />
      <Route path='*' element={<NotFoundComponent />} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
    
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>

  // </React.StrictMode>,
)
