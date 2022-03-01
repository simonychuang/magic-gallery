import styled from 'styled-components';

interface GridProps {
  columns: number;
}

interface ColProps {
  size: number;
}

export const Grid = styled.div<GridProps>`
  display: grid;
  grid-template-columns: repeat(${(props) => props.columns}, 1fr);
  grid-gap: 10px;
`;

export const Row = styled.div`
  display: flex;
`; 

export const Col = styled.div<ColProps>`
  flex: ${(props) => props.size};
`;

export const GridItem = styled.div`
  display: flex;
  justify-content: center;
  padding: .5rem;
`;
