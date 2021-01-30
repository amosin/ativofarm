import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import { useWallet } from 'use-wallet'

import selectPoolImage from '../../assets/img/select_pool.png'

import Button from '../../components/Button'
import Page from '../../components/Page'
import PageHeader from '../../components/PageHeader'
import WalletProviderModal from '../../components/WalletProviderModal'

import useModal from '../../hooks/useModal'

import Farm from '../Farm'

import FarmCards from './components/FarmCards'
import { useIntl } from 'react-intl';
import { KEYS } from '../../i18n'


const Farms: React.FC = () => {
  const intl = useIntl();
  const { path } = useRouteMatch()
  const { account } = useWallet()
  const [onPresentWalletProviderModal] = useModal(<WalletProviderModal />)
  return (
    <Switch>
      <Page>
        {!!account ? (
          <>
            <Route exact path={path}>
              <PageHeader
                icon={<img src={selectPoolImage} height="120" />}
                subtitle={intl.formatMessage({ id: KEYS.FARMS_EXPLAIN })}
                title={intl.formatMessage({ id: KEYS.SELECT_FAVORITE_POOL })}
              />
              <FarmCards />
            </Route>
            <Route path={`${path}/:farmId`}>
              <Farm />
            </Route>
          </>
        ) : (
          <div
            style={{
              alignItems: 'center',
              display: 'flex',
              flex: 1,
              justifyContent: 'center',
            }}
          >
            <Button
              onClick={onPresentWalletProviderModal}
              text={intl.formatMessage({ id: KEYS.UNLOCK_WALLET })}
            />
          </div>
        )}
      </Page>
    </Switch>
  )
}

export default Farms
