import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './routes/Router.jsx'
import {Toaster} from "react-hot-toast"
import {Provider} from "react-redux"
import store, { persistor } from "./redux/store.js"
import { PersistGate } from 'redux-persist/integration/react'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
         <RouterProvider router={router}/>
         <Toaster/>
      </PersistGate>
    </Provider>
  </StrictMode>,
)
