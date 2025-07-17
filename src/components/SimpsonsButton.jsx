import styled from "styled-components";

export const SimpsonsButton = styled.button`
  background: #ed2939;
  color: #fff;
  font-family: 'Luckiest Guy', 'Comic Sans MS', cursive, sans-serif;
  border: 3px solid #000;
  border-radius: 16px;
  padding: 7px 21px;
  font-size: 1.1rem;
  box-shadow: 0 4px 12px 0 rgba(0,0,0,0.08);
  transition: background 0.2s, color 0.2s, transform 0.2s;
  &:hover {
    background: #ffd90f;
    color: #ed2939;
    border-color: #ed2939;
    transform: scale(1.08) rotate(-2deg);
    box-shadow: 0 12px 32px 0 rgba(237,41,57,0.18);
  }
`;



// ...

<SimpsonsButton type="submit">Agregar producto</SimpsonsButton>