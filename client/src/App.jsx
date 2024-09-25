import react from 'react'
import './App.css'
import Header from './components/headers/Header'
import Pages from './components/mainpages/Pages'
import {BrowserRouter as Router} from 'react-router-dom'
import { DataProvider } from './GlobalState'

const App=()=>{
  return(
    <DataProvider> 
    <Router>
    <div className='lg:p-[30px]'>
      <Header/>
      <Pages/>
    </div>
    </Router>
    </DataProvider>
  )
}

export default App
