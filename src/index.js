import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import SignUp from './adv_components/Register'
import Login from './adv_components/Login'
import ChatPage from './adv_components/ChatPage'
import { BrowserRouter, Routes, Route } from "react-router-dom";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>  
		<Routes>
			<Route path="/login" element={<Login />} />
			<Route path="/signup" element={<SignUp />} />
			<Route path="/chat" element={<ChatPage />} />
			<Route path="*" element={<Login />} />
		</Routes>
    </BrowserRouter>
  </StrictMode>,
)