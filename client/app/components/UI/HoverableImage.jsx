import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    width:100%;
    height:100%;
    position:relative;
    transition:all .3s ease-in-out;
    cursor:pointer;
    &:hover img{
        opacity:0.5;
    }
    &:hover div{
        opacity:1;
    }
`;

const Content = styled.div`
    position:absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
    transition:all .3s ease-in-out;
    opacity:0;
`;

export default ({
  image, content, onClick, ...props
}) => (
  <Container onClick={onClick} {...props}>
    {image}
    <Content>
      {content}
    </Content>
  </Container>
);
