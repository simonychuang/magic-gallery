import React, { useState, useEffect } from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import mtgsdk from 'mtgsdk';
import { Grid, GridItem } from './components/Grid/Grid';
import Spinner from './components/Spinner/Spinner';
import styled from 'styled-components';

type CardType = {
  name: string,
  names: string[],
  manaCost: string,
  cmc: string,
  colors: string[],
  imageUrl: string,
};

const StyledApp = styled.div`
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: auto;
  height: 100%;
`;

export const App = () => {
  const [cardData, setCardData] = useState<CardType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const queryString: string = window.location.search;
  const queryParams: URLSearchParams = new URLSearchParams(queryString);
  const cardNameFromUrl: string | null = queryParams.get('card_name');
  const colorsFromUrl: string | null = queryParams.get('colors');

  useEffect(() => {
    // mtgsdk.card.all({ page: 1, pageSize: 50 }).then((cards: CardType[]) => setCardData(cards))
    if (cardNameFromUrl != null || colorsFromUrl != null) {
      // handle case where there's search parameters in the url
    }
    mtgsdk.card.where({ page: 1, pageSize: 12, contains:'imageUrl' })
    .then((cards: CardType[]) => {
      setCardData(cards);
    })

    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <StyledApp>
        <Spinner />
      </StyledApp>
    );
  }

  return (
    <StyledApp>
      <Grid columns={4} >
        {cardData.map((card) => {
        const { name, imageUrl } = card;

        return (
          <GridItem>
            <img src={imageUrl} alt={`${name}-image`} />
          </GridItem>
        );
      })}
      </Grid>
    </StyledApp>
  );
}
