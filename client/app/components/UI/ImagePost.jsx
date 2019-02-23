import React, { useState } from 'react';
import styled from 'styled-components';
import Loader from './Loader';


const ImagePost = styled.div`
    height:30rem;
    min-height:600px;
    border-radius:5px;
    box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);

`;

ImagePost.Header = styled.div`
    height: 10%;
    background-color:white;
    display:flex;
    align-items:center;
    border-bottom:1px solid rgba(0,0,0,.1);

`;
ImagePost.Header.Img = styled.img`
    width:40px;
    height:40px;
    border-radius:50%;
    margin-left:5px;
`;

ImagePost.Footer = styled.div`
    height: 20%;
    background-color:white;
    border-top:1px solid rgba(0,0,0,.1);
`;
const ImageContainer = styled.div`
    height:70%;
    display:flex;
    justify-content:center;
    align-items:center;
    position:relative;
`;
const LoaderContainer = styled.div`
    height:100%;
    width:100%;
    top:0;
    left:0;
    position:absolute;
    display:flex;
    align-items:center;
    justify-content:center;
`;

ImagePost.Image = ({ src }) => {
  if (!src) return null;
  const [isLoaded, onLoad] = useState(false);
  const Image = (<img style={{ height: '100%', width: '100%' }} src={src} alt="user post" onLoad={() => onLoad(true)} />);

  return (
    <ImageContainer>
      {Image}
      {' '}
      {isLoaded ? null : (
        <LoaderContainer>
          <Loader />
        </LoaderContainer>
      )}
    </ImageContainer>
  );
};


export default ImagePost;
