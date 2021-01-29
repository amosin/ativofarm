import React, { useReducer } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { UseWalletProvider } from 'use-wallet'
import TopBar from './components/TopBar'
import FarmsProvider from './contexts/Farms'
import ModalsProvider from './contexts/Modals'
import TransactionProvider from './contexts/Transactions'
import SushiProvider from './contexts/SushiProvider'
import theme from './theme'
import Farms from './views/Farms'
import Home from './views/Home'
import { CHAIN_ID } from './sushi/lib/constants'
import About from './views/about/about';
import {LanguageContext, initialState } from './contexts/Languages'
import { LangReducer } from './contexts/Languages';
import { I18nProvider } from './i18n'


const App: React.FC = () => {
  return (
    <Providers>
      <Router>
        <TopBar />
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/farms">
            <Farms />
          </Route>
          <Route path="/about">
            <About />
          </Route>
        </Switch>
      </Router>
    </Providers>
  )
}

const Providers: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(LangReducer, initialState);
  const { lang } = state;
  console.log(lang);
  return (
    <ThemeProvider theme={theme}>
      <LanguageContext.Provider value={{ ...state, dispatch }}>
        <I18nProvider locale={lang}>
          <UseWalletProvider
            chainId={CHAIN_ID}
            connectors={{
              walletconnect: { rpcUrl: 'https://mainnet.eth.aragon.network/' },
            }}
          >
            <SushiProvider>
              <TransactionProvider>
                <FarmsProvider>
                  <ModalsProvider>{children}</ModalsProvider>
                </FarmsProvider>
              </TransactionProvider>
            </SushiProvider>
          </UseWalletProvider>
        </I18nProvider>
      </LanguageContext.Provider>
    </ThemeProvider>
  )
}

export default App
