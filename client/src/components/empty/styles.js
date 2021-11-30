import styled from "styled-components";

export const Container = styled.div`
  height: 85%;
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  border: 1px solid #d2d6dc;
  padding: 20px;
`;

export const Placeholder = styled.img`
  height: 256px;
  width: 256px;
`;

export const Description = styled.p`
  text-align: center;
  line-height: 24px;
`;

export const Emoji = styled.div`
  font-size: 200px;
`;

export const Button = styled.button`
  height: auto;
  width: 100%;
  background: #2a2a2a;
  border-radius: 4px;
  padding: 12px 16px;
  color: #fff;
  cursor: pointer;
  display: flex;
  justify-content: center;
  margin-top: 20px;
  border: none;
  font-size: 16px;

  &:disabled {
    cursor: not-allowed;
    color: #999;
  }
`;
