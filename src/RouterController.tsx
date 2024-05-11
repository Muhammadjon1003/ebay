import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Basket from './pages/Basket/Basket'
import Categories from './pages/Categories/Categories'
import SingleProduct from './pages/SingleProduct/SingleProduct'
import Like from './pages/Like/Like'
import Search from './pages/Search/Search'
import Login from './pages/Login/Login'
import SignUp from './pages/SignUp/SignUp'

const RouterController = () => {
  return (
   <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/cart' element={<Basket/>}/>
    <Route path='/like' element={<Like/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/signup' element={<SignUp/>}/>
    <Route path='/category/:category' element={<Categories/>}/>
    <Route path='/category/:category' element={<Categories/>}/>
    <Route path='/products/:id' element={<SingleProduct/>}/>
    <Route path='/products/search/*' element={<Search/>}/>
   </Routes>
  )
}

export default RouterController
