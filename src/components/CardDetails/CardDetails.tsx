import React from 'react';
import styled from 'styled-components';
import Tilt from 'react-parallax-tilt';

interface CardDetailsProps {
  cardName: string;
  cardImage: string;
  onClose: () => void;
}

const StyledCardDetailOverlay = styled.div`
  height: 100vh;
  left: 0;
  position: fixed;
  top: 0;
  width: 100vw;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.5);
`;

const StyledCardDetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  position: relative;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0;
`;

export const CardDetails = (props: CardDetailsProps) => {
  const { cardName, cardImage, onClose } = props;

  return (
    <StyledCardDetailOverlay onClick={onClose} >
      <StyledCardDetailWrapper>
        <Tilt>
          <img src={cardImage} alt={`${cardName}-image`} height='640' width='450' />
        </Tilt>
      </StyledCardDetailWrapper>
    </StyledCardDetailOverlay>
  )
}
