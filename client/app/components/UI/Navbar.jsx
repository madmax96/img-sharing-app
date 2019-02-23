import styled from 'styled-components';

const Navbar = styled.div`
    width:100%;
    height:3rem;
    background-color: #002e63;
    display:flex;
    align-items:center;
    justify-content:center;
    position:fixed;
    top:0;
    left:0;
    z-index:1;
`;
Navbar.Logo = styled.div`
    height:80%;
    margin-right:auto;
    margin-left:2rem;
    cursor:pointer;
    display:flex;    
`;
Navbar.FirstSection = styled.div`
    margin-right:auto;
    padding-left:2rem;
`;
Navbar.ThirdSection = styled.div`
    height:90%;
    display:flex;
    align-items:center;
    padding-right:2rem;
`;
export default Navbar;
