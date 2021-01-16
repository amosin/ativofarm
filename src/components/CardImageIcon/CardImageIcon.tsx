import React from 'react';
import styled from 'styled-components';

interface CardImageIconProps {
  src: string
}

const CardImageIcon: React.FC<CardImageIconProps> = ({src}) => {
  return <ImageContainer src={src}/>
};

const ImageContainer = styled.img`
  width: 80px;
  height: 80px;
`;

export default CardImageIcon
