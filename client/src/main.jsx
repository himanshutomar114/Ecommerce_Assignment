import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import UserProvider from "./context/UserProvider.jsx"; 


import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
      <GoogleOAuthProvider clientId="473861213560-tsc184rhtfu8ja0cm0ttgal7enuhaq3g.apps.googleusercontent.com">
        <UserProvider>
        <App />
        </UserProvider>
     </GoogleOAuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
)
