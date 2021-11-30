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
  animation: ${appear} 0.2s;
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

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Image = styled.img`
  height: 80%;
  width: 80%;
`;

export const Emoji = styled.div`
  font-size: 200px;
`;

export const Description = styled.p`
  text-align: center;
  line-height: 24px;
`;

export const Tabs = styled.div`
  height: auto;
  width: 100%;
  display: flex;
  border-radius: 4px;
  border: 1px solid #d2d6dc;
  overflow: hidden;
  margin-bottom: 20px;
`;

export const Tab = styled.button`
  height: auto;
  width: 50%;
  background: ${(props) => (props.isActive ? "rgb(245, 246, 250)" : "white")};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  border-right: none;
  border: none;
  padding-top: 12px;
  padding-bottom: 12px;

  &:hover {
    cursor: pointer;
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

export const Key = styled.div`
  color: #999;
  font-size: 14px;
  padding-top: 4px;
  padding-bottom: 4px;
`;

export const Value = styled.div`
  color: #2a2a2a;
  font-size: 14px;
  padding-top: 4px;
  padding-bottom: 4px;
`;

export const Overview = styled.div`
  height: auto;
  padding: 12px;
  border-radius: 4px;
  margin-bottom: 16px;
  border: 1px solid #d2d6dc;
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
`;
