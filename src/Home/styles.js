import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin-bottom: 40px;
`;

export const Title = styled.h1`
  margin-top: 20px;
`;

export const DateContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 20px;
`;

export const Button = styled.button`
  border: none;
  padding: 10px;
  background: #5965e0;
  border-radius: 10px;
`;

export const DateChoosed = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const HoursCalculated = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;
