import styled, { keyframes } from "styled-components";

const appear = keyframes`
  0% { transform: translateX(60%);  }
  25% { transform: translateX(30%);  }
  50% { transform: translateX(0%);  }
  75% { transform: translateX(-10%);  }
  100% {transform: translateX(0%);   }
`;

export const Container = styled.div`
  height: 100%;
  width: 35%;
  background: #fefefe;
  padding-left: 20px;
  padding-right: 20px;
  border-left: 1px solid #d2d6dc;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  animation: ${appear} 0.2s;
`;

export const Button = styled.div`
  height: auto;
  width: auto;
  background: #2a2a2a;
  border-radius: 4px;
  padding: 12px 16px;
  color: #fff;
  cursor: pointer;
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 30px;
`;

export const EmptyState = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  justify-content: center;
`;

export const MetaMask = styled.img`
  height: auto;
  width: auto;
`;

export const Description = styled.p`
  text-align: center;
  margin-top: -28px;
  line-height: 24px;
`;
