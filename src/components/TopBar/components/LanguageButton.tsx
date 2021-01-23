import React from 'react'
import styled from 'styled-components'
import useModal from '../../../hooks/useModal'
import LanguageModal from './LanguageModal';

const LanguageButton = () => {
  const [onPresentLanguageModal] = useModal(<LanguageModal />)

  return (
    <StyledLanguageButton onClick={onPresentLanguageModal}>
          ⚙
    </StyledLanguageButton>
  )
}

const StyledLanguageButton = styled.span`
width: 5px;
font-size: large;
padding-right: 8px
`

export default LanguageButton
