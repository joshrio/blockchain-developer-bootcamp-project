import styled from "styled-components";

export const Container = styled.div`
  height: auto;
  width: auto;
  display: flex;
  flex-direction: column;
`;

export const Field = styled.input`
  padding: 16px;
  font-size: 16px;
  border-radius: 4px;
  padding: 16px;
  border: 1px solid #2a2a2a;
  background: #fff;
  color: #2a2a2a;

  &::placeholder {
    color: color: #9a9a9a;
  }

  &:focus {
    border: 1px solid #2a2a2a;
    outline: 1px solid #2a2a2a;
  }
`;

export const Label = styled.label`
  font-size: 12px;
  color: #9a9a9a;
`;
