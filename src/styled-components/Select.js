import styled from "styled-components";

export const Select = styled.select`
  width: 14rem;
  height: 2.5rem;
  padding: 0.5rem;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  cursor: pointer;
  background-color: #16181a;
  background-image: #16181a;
`;

export const SelectMedium = styled(Select)`
  width: 29rem;
`;

export const SelectFull = styled(Select)`
  width: 30rem;
  height: 3rem;
`;

export const Option = styled.option`
  border: 2px solid #16181a;
  border-radius: 5px;
`;
