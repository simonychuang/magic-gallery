import styled from 'styled-components';

interface GridProps {
  columns: number;
}

export const Grid = styled.div<GridProps>`
  display: grid;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  grid-template-columns: repeat(${(props) => props.columns}, 15em);
  grid-gap: 0.5em;
`;

export const GridItem = styled.div`
  display: flex;
  justify-content: center;
  padding: .5rem;
`;

export const GridItemImage = styled.img`
  max-width: 100%;
  max-height: 100%;
`;
