import styled from "styled-components";

export const SimpsonsActionButton = styled.button`
  background: ${props => props.variant === "edit" ? "#00aeef" : "#ed2939"};
  color: #fff;
  font-family: 'Luckiest Guy', 'Comic Sans MS', cursive, sans-serif;
  border: 2px solid #000;
  border-radius: 14px;
  padding: 6px 16px;
  font-size: 1rem;
  box-shadow: 0 2px 8px 0 rgba(0,0,0,0.10);
  transition: background 0.2s, color 0.2s, transform 0.2s;
  width: 100%;
  &:hover {
    background: #ffd90f;
    color: ${props => props.variant === "edit" ? "#00aeef" : "#ed2939"};
    border-color: #ed2939;
    transform: scale(1.06) rotate(-2deg);
    box-shadow: 0 8px 24px 0 rgba(237,41,57,0.18);
  }
`;