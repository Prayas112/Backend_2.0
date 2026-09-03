import {BrowserRouter, Route, Routes} from 'react-router'
import Login from './features/auth/pages/Login'
import Register from './features/auth/pages/Register'
const Approutes = () => {
  return (
<BrowserRouter>
 <Routes>
  <Route path='/' element={<h1>hello guys</h1>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/register' element={<Register/>}/>
 </Routes>
</BrowserRouter>
  )
}

export default Approutes
