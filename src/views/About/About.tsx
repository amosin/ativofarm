import React from 'react';
import styled from "styled-components";
import Container from '../../components/Container'
import Page from '../../components/Page'
import Spacer from "../../components/Spacer";

const About = () => {
  return <Page>
    <Container>
    <Spacer/>
    <StyledTitle>This is About Page</StyledTitle>
    <StyledSubtitle>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</StyledSubtitle>
    </Container>
  </Page>
};

const StyledTitle = styled.h1`
  font-family: URW Chancery L, cursive;
  color: ${(props) => props.theme.color.grey[500]};
  font-size: 36px;
  text-align: center;
  font-weight: 700;
  margin: 0;
  padding: 0;
`
const StyledSubtitle = styled.h3`
  color: ${(props) => props.theme.color.grey[400]};
  font-size: 18px;
  font-weight: 400;
  margin: 0;
  padding: 0;
  text-align: center;
`

export default About
