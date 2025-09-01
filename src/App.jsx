import { Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './Components/Header'
import SignIn from './Pages/SignIn'
import SignUp from './Pages/SignUp'
import Home from './Pages/Home'
import Cart from './Pages/Cart'
import Favorites from './Pages/Favorites'
function App() {

  return (
    <>
      <Header />
      
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/signin" element={<SignIn/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/favorites' element={<Favorites/>} />
      </Routes>
    </>
  )
}

export default App
