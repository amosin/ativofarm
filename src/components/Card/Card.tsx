import React from 'react'
import styled from 'styled-components'

const Card: React.FC = ({ children }) => <StyledCard>{children}</StyledCard>

const StyledCard = styled.div`
  --gradient-to-color: #050a20;
  --gradient-from-color: #11315f;
  --gradient-color-stops: var(--gradient-from-color),var(--gradient-to-color,rgba(42,67,101,0));
  background-image: linear-gradient(to right,var(--gradient-color-stops));
  border-radius: 12px;
  box-shadow: 3px 3px 4px #1c5593;
  display: flex;
  flex: 1;
  flex-direction: column;
`

export default Card
