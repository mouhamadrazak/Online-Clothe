import 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import ShopContextProvider from './context/ShopContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter> {/*druri ta ekhod support bel app jsx mn browserrouter*/}
  <ShopContextProvider>  {/*we well get supported from shop context provider*/}
         <App/>               
  </ShopContextProvider>
  </BrowserRouter>,
)
