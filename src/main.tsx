
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { PetraWallet } from "petra-plugin-wallet-adapter";
import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";
import {BrowserRouter} from "react-router-dom"
import { StrictMode } from 'react'


const wallets = [new PetraWallet()];

createRoot(document.getElementById('root')!).render(
  <AptosWalletAdapterProvider plugins={wallets} autoConnect={true}>
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
  </AptosWalletAdapterProvider>
)