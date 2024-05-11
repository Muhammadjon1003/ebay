import { useLocation } from 'react-router-dom'
import './App.scss'
import RouterController from './RouterController'
import Footer from './components/Footer/Footer'
import Navbar from './components/Navbar/Navbar'
function App() {
const {pathname} = useLocation()
  return (
    <div className='App_container'>
  { !pathname.includes('/login') && !pathname.includes('/signup') && <Navbar/>}
    <RouterController/>
    {/* { !pathname.includes('/login') && !pathname.includes('/signup') && <Footer/>} */}

    </div>
  )
}

export default App
