import styled from "styled-components";
export const ProgressBar = styled.div`
  display: flex;
  flex-direction: column-reverse;
  justify-content: center;
  align-items: center;
  width: 95px;
  height: 95px;
  border-radius: 50%;
  background: radial-gradient(closest-side, #16181a 79%, transparent 80% 100%),
    conic-gradient(
      rgb(33, 150, 243) ${(props) => props.content}%,
      rgba(255, 255, 255, 0.05) 0
    );

  &::before {
    content: "${(props) => props.content}%";
    font-size: 20px;
  }
`;
