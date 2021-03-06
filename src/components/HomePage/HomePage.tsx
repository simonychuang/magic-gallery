import React, { useState, useEffect, FunctionComponent } from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import mtgsdk from 'mtgsdk';
import { useSearchParams } from 'react-router-dom';
import Tilt from 'react-parallax-tilt';
import styled from 'styled-components';
import { Grid, GridItem, GridItemImage } from '../Grid/Grid';
import { Spinner } from '../Spinner/Spinner';
import { Pagination } from '../Pagination/Pagination';
import { CardDetails } from '../CardDetails/CardDetails';

type ForeignNameType = {
  flavor?: string | null,
  imageUrl: string,
  laguage: string,
  multiverseId: number,
  name: string,
  text: string,
  type: string,
}

type CardType = {
  artist: string,
  cmc: number,
  colorIdentity: string[],
  colors: string[],
  foreignNames: ForeignNameType[],
  id: string,
  imageUrl: string,
  layout: string,
  legalities: {
    format: string,
    legality: string,
  }[],
  manaCost: string,
  multiverseId: string,
  name: string,
  number: string,
  originalText: string,
  originalType: string,
  power: string,
  printings: string[],
  rarity: string,
  rulings: {
    date: string,
    text: string,
  }[],
  set: string,
  setName: string,
  subTypes: string[],
  supertypes: string[],
  text: string,
  toughness: string,
  type: string,
  types: string[],
  variations: string[],
};

type ExpandedCardType = {
  name: string,
  imageUrl: string,
};

const StyledHomePage = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 5em;
  height: 100%;
`;

const StyledFiltersForm = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 5em;
  width: 80%;
`;

const StyledSearch = styled.input`
  border-radius: 0.5rem;
  border: 1px solid #abadae;
  height: 3em;
  width: 30%;
  padding-left: 1em;
  box-shadow: 0 1px 0 0 rgba(46, 50, 53, 0.1);

  &:hover {
    border: 2px solid #06b2bc;
  }

  &:focus {
    border: 2px solid #06b2bc;
  }
`;

const StyledFilters = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 2em;
`;

const StyledCheckbox = styled.div`
  margin: 0 0.5em;
`;

const StyledButton = styled.button`
  height: 3em;
  border: 1px solid #abadae;
  border-radius: 4px;
  background: linear-gradient(0deg, #f8f8f8 0%, #ffffff 100%);
  box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.05);
  margin-left: 2em;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledButtonText = styled.span`
  color: #0d0f0f;
  font-size: 1rem;
  font-weight: 400;
  letter-spacing: 0.06px;
`;

const StyledSwitchWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin: 0 2em;
`;

const StyledSwitchLabel = styled.label`
  width: 42px;
  height: 26px;
  border-radius: 15px;
  background: #bebebe;
  cursor: pointer;
  margin: 0 0.5em;
  &::after {
    content: "";
    display: block;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    margin: 3px;
    background: #ffffff;
    box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.2);
    transition: 0.2s;
  }
`;

const StyledSwitch = styled.input`
  opacity: 0;
  z-index: 1;
  border-radius: 15px;
  display: none;
  &:checked + ${StyledSwitchLabel} {
    &::after {
      content: "";
      display: block;
      border-radius: 50%;
      margin-left: 21px;
      transition: 0.2s;
    }
  }
`;

const initialExpandedCard: ExpandedCardType = {
  name: '',
  imageUrl: '',
};

export const HomePage: FunctionComponent = () => {
  const [cardData, setCardData] = useState<CardType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchParams, setSearchParams] = useSearchParams({});
  const [expandedCard, setExpandedCard] = useState<ExpandedCardType>(initialExpandedCard);
  const cardQuery = searchParams.get('card') || '';
  const colorsQuery = searchParams.get('colors') || '';
  const pageQuery = searchParams.get('page') || '';
  const [searchStr, setSearchStr] = useState<string>(cardQuery);
  const [currentPage, setCurrentPage] = useState<number>(parseInt(pageQuery));
  const parsedColorQuery = colorsQuery.includes('|') ? colorsQuery.split('|') : colorsQuery.split(',');
  const [checkedColors, setCheckedColors] = useState<string[]>((colorsQuery ? parsedColorQuery : []));
  const [logicalAnd, setLogicalAnd] = useState<boolean>((colorsQuery && colorsQuery.includes(',')) ? true : false);

  useEffect(() => {
    if (cardQuery != null || colorsQuery != null || pageQuery != null) {
      // handle case where there's search parameters in the url
      mtgsdk.card.where({ page: currentPage, pageSize: 12, contains:'imageUrl', name: cardQuery, colors: colorsQuery })
      .then((cards: CardType[]) => {
        setCardData(cards);
      })
    } else {
      mtgsdk.card.where({ page: currentPage, pageSize: 12, contains:'imageUrl' })
      .then((cards: CardType[]) => {
        setCardData(cards);
      })
    }
    setIsLoading(false);
  }, [cardQuery, colorsQuery, pageQuery]);

  useEffect(() => {
    submitSearch();
  }, [currentPage])

  const handleSearchChange = (e: React.FormEvent<HTMLInputElement>) => {
    const card = e.currentTarget.value;

    setSearchStr(card);
  }

  const submitSearch = () => {
    let colorsQueryStr = '';

    if (checkedColors.length > 0) {
      if (logicalAnd) {
        colorsQueryStr = `${checkedColors.join(',')}`;
      } else {
        colorsQueryStr = `${checkedColors.join('|')}`;
      }
    }

    setSearchParams({ card: searchStr, colors: colorsQueryStr, page: currentPage.toString() });
  }

  const onCheckboxChange = (key: string) => {
    if (!checkedColors.includes(key)) {
      setCheckedColors([...checkedColors, key]);
    } else {
      setCheckedColors(checkedColors.filter((item) => item !== key))
    }
  }

  const onCardClick = (name: string, imageUrl: string) => {
    setExpandedCard({
      name,
      imageUrl,
    })
  }

  const onOverlayClick = () => {
    setExpandedCard(initialExpandedCard);
  }

  const handlePaginationClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
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
        <StyledFilters>
          <StyledCheckbox>
            <input checked={checkedColors.includes('red')} type="checkbox" id="red-checkbox" onChange={() => onCheckboxChange('red')} />
            <label htmlFor="red-checkbox">Red</label>
          </StyledCheckbox>
          <StyledCheckbox>
            <input checked={checkedColors.includes('blue')} type="checkbox" id="blue-checkbox" onChange={() => onCheckboxChange('blue')} />
            <label htmlFor="blue-checkbox">Blue</label>
          </StyledCheckbox>
          <StyledCheckbox>
            <input checked={checkedColors.includes('black')} type="checkbox" id="black-checkbox" onChange={() => onCheckboxChange('black')} />
            <label htmlFor="black-checkbox">Black</label>
          </StyledCheckbox>
          <StyledCheckbox>
            <input checked={checkedColors.includes('white')} type="checkbox" id="white-checkbox" onChange={() => onCheckboxChange('white')} />
            <label htmlFor="white-checkbox">White</label>
          </StyledCheckbox>
          <StyledCheckbox>
            <input checked={checkedColors.includes('green')} type="checkbox" id="green-checkbox" onChange={() => onCheckboxChange('green')} />
            <label htmlFor="green-checkbox">Green</label>
          </StyledCheckbox>
        </StyledFilters>
        {checkedColors.length > 1 && (
          <StyledSwitchWrapper>
            <span>OR</span>
            <StyledSwitch checked={logicalAnd} id="logical-select" type="checkbox" onChange={() => setLogicalAnd(!logicalAnd)} />
            <StyledSwitchLabel htmlFor="logical-select" />
            <span>AND</span>
          </StyledSwitchWrapper>
        )}
        <StyledButton type="button" onClick={() => submitSearch()}>
          <StyledButtonText>Search</StyledButtonText>
        </StyledButton>
      </StyledFiltersForm>
      <Grid columns={4} >
        {cardData.map((card) => {
        const { name, id, imageUrl } = card;

        return (
          <div key={id}>
            <Tilt>
              <GridItem onClick={() => onCardClick(name, imageUrl)}>
                <GridItemImage src={imageUrl} alt={`${name}-image`} />
              </GridItem>
            </Tilt>
          </div>
        );
      })}
      </Grid>
      <Pagination itemsPerPage={12} currentPage={currentPage} onPageClick={handlePaginationClick} />
      {expandedCard.name && (
        <CardDetails cardName={expandedCard.name} cardImage={expandedCard.imageUrl} onClose={() => onOverlayClick()} />
      )}
    </StyledHomePage>
  )
}
