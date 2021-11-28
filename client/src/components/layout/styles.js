import styled from "styled-components";

export const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background: papayawhip;
  display: flex;
`;

export const Menu = styled.div`
  height: 100%;
  width: 25%;
  background: rgb(245, 246, 250);
  border-right: 1px solid #d2d6dc;
`;

export const Body = styled.div`
  width: 80%;
  background: #fafafa;
  padding-left: 20px;
  padding-right: 20px;
  overflow: scroll;
`;

export const List = styled.div`
  height: auto;
  width: auto;
`;

export const Item = styled.li`
  font-size: 16px;
  color: #2a2a2a;
  padding: 20px 24px;
  border-bottom: 1px solid #d2d6dc;
  list-style: none;
  display: flex;
  align-items: center;

  &:hover {
    cursor: pointer;
    border-left: 3px solid black;
  }
`;
