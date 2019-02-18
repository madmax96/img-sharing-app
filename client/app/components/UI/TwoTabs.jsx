import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width:100%;
  height:100%;
  background-image:linear-gradient(#13547a,#80d0c7);
  box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);
  border-radius:10px;
`;

const Menu = styled.div`
  display:flex;
  height:15%;
`;

Menu.Item = styled.div`
  border-radius:10px;
  position:relative;
  display:flex;
  justify-content:center;
  align-items:center;
  padding:10px;
  color:${props => (props.active ? '#13547a' : 'white')};
  transition: color .3s ease-in;
  font-weight:bold;
  flex-basis:50%;
  z-index:1;
  cursor:pointer;
  &::before{
    content:'';
    background-color:white;
    z-index:-1;
    position:absolute;
    left:0;
    top:0;
    height:${props => (props.active ? '100%' : '0%')};
    width:100%;
    transition: height .2s ease-in;
    border-top-left-radius:10px;
    border-top-right-radius:10px;
  }
  &:hover{
    color: #13547a;
    &::before {
      height:100%;
    }
  } 
`;

const Content = styled.div`
  height:85%;
  overflow-y:auto;
  overflow-x:hidden;
`;
export default class TwoTabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tabOneActive: props.active === 1 };
  }

  render() {
    const { left, right } = this.props;
    const { tabOneActive } = this.state;
    const content = tabOneActive ? left.content : right.content;
    return (
      <Container>
        <Menu>
          <Menu.Item
            active={tabOneActive}
            onClick={() => this.setState({ tabOneActive: true })}
          >
            <h1>{left.title}</h1>

          </Menu.Item>
          <Menu.Item
            active={!tabOneActive}
            onClick={() => this.setState({ tabOneActive: false })}
          >
            <h1>{right.title}</h1>

          </Menu.Item>

        </Menu>
        <Content>
          {content}
        </Content>
      </Container>
    );
  }
}
