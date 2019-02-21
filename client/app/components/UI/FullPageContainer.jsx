import React from 'react';
import styled from 'styled-components';
import backgroundIMG from '../../../../public/img/back2.jpg';

const Container = ({ className, children }) => <div className={className}>{children}</div>;

export default styled(Container)`
  height:100vh;
  background-image: url(${backgroundIMG});
  background-position: center; 
  background-repeat: no-repeat; 
  background-size: cover;
  background-origin:padding-box;
  `;
