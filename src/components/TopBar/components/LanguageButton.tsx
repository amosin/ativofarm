import React from 'react'
import styled from 'styled-components'
import useModal from '../../../hooks/useModal'
import LanguageModal from './LanguageModal';
import { KEYS } from '../../../i18n'
import { useIntl } from 'react-intl'


const LanguageButton = () => {
  const intl = useIntl();
  const [onPresentLanguageModal] = useModal(<LanguageModal />)

  return (
    <StyledLanguageButton onClick={onPresentLanguageModal}>
        {intl.formatMessage({ id: KEYS.LANG })}
    </StyledLanguageButton>
  )
}

const StyledLanguageButton = styled.span`
width: 100%;
font-size: 12px;
padding-left: 0px
`

export default LanguageButton