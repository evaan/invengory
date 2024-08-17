import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import BrowsePage from './pages/BrowsePage'
import './styles.css';
import AccountPage from './pages/AccountPage'
import ManagePage from './pages/ManagePage'
import NotFoundPage from './pages/NotFoundPage'

localStorage.setItem("chakra-ui-color-mode", "dark");

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider>
        <ColorModeScript initialColorMode="dark" />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/browse" element={<BrowsePage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/manage" element={<ManagePage />} />
            <Route path="*" element={<NotFoundPage />} /> {/* may wanna change this, redirect to root on 404 */}
          </Routes>
        </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>,
)
