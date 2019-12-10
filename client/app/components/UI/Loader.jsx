import styled, { keyframes } from 'styled-components';
import React from 'react';

const spinny = keyframes`
  0% {
    transform: rotate(0deg) scale(1);
  }
  50% {
    transform: rotate(45deg) scale(1.4);
  }
  100% {
    transform: rotate(360deg) scale(1);
  }
`;

const Loader = styled.div`
  width: 60px;
  height: 60px;
  background: #eee;
  border-radius: 50%;
  position: relative;
  display: inline-block;

  &:after {
    content: "";
    display: block;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    position: absolute;
    border: 4px solid transparent;
    border-top-color: #13547a;
    border-bottom-color: #13547a;
    animation: ${spinny} 1s linear infinite;
  }
`;

export default () => (<Loader />);
