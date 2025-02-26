import react from 'react'
import './App.css'
import Header from './components/headers/Header'
import Pages from './components/mainpages/Pages'
import {BrowserRouter as Router} from 'react-router-dom'
import { DataProvider } from './GlobalState'
import OptionalDisplay from './components/mainpages/login/OptionalDisplay'
import Sidebar from './components/headers/Sidebar'
import { CartProvider } from './components/CartContext/CartContext'

const App=()=>{
  return(
    <Router>
    <DataProvider> 
      <CartProvider>
    <div className=''>
      <Header/>
      <Sidebar/>
      {/* <OptionalDisplay/> */}
      <Pages/>
    </div>
    </CartProvider>
    </DataProvider>
    </Router>
  )
}

export default App
