import {
  RouterProvider,
} from "react-router-dom";
import router from './routes'

function App() {

  return (
    <RouterProvider router={router} />
    // <div>
    //   <LoginPage/>
    //   <RegisterPage/>
    //   <HomePage/>
    //   <EditCuisinePage/>
    //   <AddCuisinePage/>
    //   <CategoriesPage/>
    // </div>
  )
}

export default App