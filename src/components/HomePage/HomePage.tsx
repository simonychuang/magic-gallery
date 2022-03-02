import React, { useState, useEffect } from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import mtgsdk from 'mtgsdk';
import { useSearchParams } from 'react-router-dom';
import { Grid, GridItem, GridItemImage } from '../Grid/Grid';
import Spinner from '../Spinner/Spinner';
import styled from 'styled-components';

type CardType = {
  name: string,
  names: string[],
  manaCost: string,
  cmc: string,
  colors: string[],
  id: string;
  imageUrl: string,
};

const StyledHomePage = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: auto;
  padding: 0 5em;
  height: 100%;
`;

const StyledFiltersForm = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 10em;
  width: 100%;
`;

const StyledSearch = styled.input`
  border-radius: 0.5rem;
  border: 1px solid #abadae;
  height: 3em;
  width: 30%;
  box-shadow: 0 1px 0 0 rgba(46, 50, 53, 0.1);

  &:hover {
    border: 2px solid #06b2bc;
  }

  &:focus {
    border: 2px solid #06b2bc;
  }
`;

export const HomePage = () => {
  const [cardData, setCardData] = useState<CardType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchParams, setSearchParams] = useSearchParams({});
  const cardQuery = searchParams.get('card') || '';
  const colorsQuery = searchParams.get('colors')|| '';
  const [searchStr, setSearchStr] = useState<string>(cardQuery);

  useEffect(() => {
    if (cardQuery != null || colorsQuery != null) {
      // handle case where there's search parameters in the url
      console.log(cardQuery)
      mtgsdk.card.where({ page: 1, pageSize: 12, contains:'imageUrl', name: cardQuery })
      .then((cards: CardType[]) => {
        setCardData(cards);
      })
    } else {
      mtgsdk.card.where({ page: 1, pageSize: 12, contains:'imageUrl' })
      .then((cards: CardType[]) => {
        setCardData(cards);
      })
    }
    setIsLoading(false);
  }, [cardQuery, colorsQuery]);

  const handleSearchChange = (e: React.FormEvent<HTMLInputElement>) => {
    const card = e.currentTarget.value;

    setSearchStr(card);
  }

  const submitSearch = () => {
    setSearchParams({ card: searchStr });
  }

  if (isLoading) {
    return (
      <StyledHomePage>
        <Spinner />
      </StyledHomePage>
    );
  }

  return (
    <StyledHomePage>
      <StyledFiltersForm>
        <StyledSearch 
          type="text"
          value={searchStr}
          placeholder="Search for a card name"
          onChange={(e) => handleSearchChange(e)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              submitSearch();
            }
          }}
        />
      </StyledFiltersForm>
      <Grid columns={4} >
        {cardData.map((card) => {
        const { name, id, imageUrl } = card;

        return (
          <GridItem key={id} >
            <GridItemImage src={imageUrl} alt={`${name}-image`} />
          </GridItem>
        );
      })}
      </Grid>
    </StyledHomePage>
  )
}
