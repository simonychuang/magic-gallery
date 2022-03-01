import React, { useState, useEffect } from 'react';
// @ts-ignore
import mtgsdk from 'mtgsdk';
import './App.css';

type CardType = {
  name: string,
  names: string[],
  manaCost: string,
  cmc: string,
  colors: string[],
};

export const App = () => {
  const [cardData, setCardData] = useState<CardType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const queryString: string = window.location.search;
  const queryParams: URLSearchParams = new URLSearchParams(queryString);
  const cardNameFromUrl: string | null = queryParams.get('card_name');
  const colorsFromUrl: string | null = queryParams.get('colors');

  useEffect(() => {
    // mtgsdk.card.all({ page: 1, pageSize: 50 }).then((cards: CardType[]) => setCardData(cards))
    mtgsdk.card.where({ page: 1, pageSize: 12})
    .then((cards: CardType[]) => {
        console.log(cards)
    })

    setIsLoading(false);
  }, []);

  if (isLoading) {
    return  <div className="App" />;
  }

  return (
    <div className="App">
    </div>
  );
}
