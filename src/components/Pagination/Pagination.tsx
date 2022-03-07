import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

interface PaginationProps {
  currentPage: number;
  itemsPerPage?: number;
  numberOfItems?: number;
  onPageClick: (pageNumber: number) => void;
}

const StyledPaginationWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 2rem 0;
`;

const StyledPaginationButton = styled.button`
  background-color: #ffffff;
  box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.05);
  border-radius: 0.4rem;
  border: 1px solid #abadae;
  cursor: pointer;
  justify-content: center;
  display: flex;
  align-items: center;
  height: 3rem;
  width: 3rem;
  margin: 0 0.5rem;

  &:active
  &:enabled {
    border: 1px solid #abadae;
    background: linear-gradient(#f8f8f8, #eaeaea);
    box-shadow: inset 0 1px 3px 0 rgba(0, 0, 0, 0.4);
  }
`;

const StyledPaginationArrowLeftDisabled = styled.i`
  border: 2px solid #d5d6d6;
  border-width: 0 2px 2px 0;
  display: inline-block;
  padding: 3px;
  transform: rotate(135deg);
  -webkit-transform: rotate(135deg);
  margin-left: 3px;
`;

const StyledPaginationArrowLeft = styled.i`
  border: 2px solid #6c6f71;
  border-width: 0 2px 2px 0;
  display: inline-block;
  padding: 3px;
  transform: rotate(135deg);
  -webkit-transform: rotate(135deg);
  margin-left: 3px;
`;

const StyledPaginationArrowRightDisabled = styled.i`
  border: 2px solid #d5d6d6;
  border-width: 0 2px 2px 0;
  display: inline-block;
  padding: 3px;
  transform: rotate(-45deg);
  -webkit-transform: rotate(-45deg);
  margin-right: 3px;
`;

const StyledPaginationArrowRight = styled.i`
  border: 2px solid #6c6f71;
  border-width: 0 2px 2px 0;
  display: inline-block;
  padding: 3px;
  transform: rotate(-45deg);
  -webkit-transform: rotate(-45deg);
  margin-right: 3px;
`;

const StyledSelectedPagination = styled.button`
  border: none;
  background: transparent;
  height: 2rem;
  width: 2rem;
  margin: 0 0.5rem;
  color: #0295a6;
  font-size: 1.4rem;
  font-weight: 600;
  cursor: pointer;
`;

const StyledSelectedPaginationText = styled.span`
  display: flex;
  flex-direction: row;
  justify-content: center;
  color: #0295a6;

  &:hover {
    color: #006874;
    transition: color 0.2s;
  }
`;

const StyledPagination = styled.button`
  border: none;
  background: transparent;
  height: 2rem;
  width: 2rem;
  margin: 0 0.5rem;
  font-size: 1.4rem;
  font-weight: 600;
  cursor: pointer;

  &:hover
  &:enabled {
    transition: background-color 0.2s;
  }
`;

const StyledPaginationText = styled.span`
  display: flex;
  flex-direction: row;
  justify-content: center;
  color: #35312e;

  &:hover {
    color: #0295a6;
  }
`;

export const Pagination: FunctionComponent<PaginationProps> = (props: PaginationProps) => {
  const { currentPage = 1, itemsPerPage = 12, numberOfItems = 100, onPageClick } = props;

  const numberOfPages = Math.ceil(numberOfItems / itemsPerPage);
  const pageNumbers = Array.from(Array(numberOfPages).keys(), (n) => n + 1);

  const maxDisplay = 5;
  let pageNumberSubset = [];

  // logic to show a subset of page numbers depending on which page the user is at
  if (currentPage < maxDisplay) {
    pageNumberSubset = pageNumbers.slice(0, maxDisplay);
  } else if (currentPage > numberOfPages - maxDisplay) {
    pageNumberSubset = pageNumbers.slice(-5);
  } else {
    pageNumberSubset = pageNumbers.slice(currentPage - 3, currentPage + 2);
  }

  return (
    <StyledPaginationWrapper>
      <StyledPaginationButton disabled={currentPage === Math.min(...pageNumbers)} onClick={() => onPageClick(currentPage - 1)}>
        {currentPage === Math.min(...pageNumbers) ? <StyledPaginationArrowLeftDisabled /> : <StyledPaginationArrowLeft />}
      </StyledPaginationButton>
      {pageNumberSubset.map((pageNumber) => {
        if (pageNumber === currentPage) {
          return (
            <StyledSelectedPagination key={pageNumber} onClick={() => onPageClick(pageNumber)}>
              <StyledSelectedPaginationText>{pageNumber}</StyledSelectedPaginationText>
            </StyledSelectedPagination>
          );
        }

        return (
          <StyledPagination key={pageNumber} onClick={() => onPageClick(pageNumber)}>
            <StyledPaginationText>{pageNumber}</StyledPaginationText>
          </StyledPagination>
        );
      })}
      <StyledPaginationButton disabled={currentPage === Math.max(...pageNumbers)} onClick={() => onPageClick(currentPage + 1)}>
        {currentPage === Math.max(...pageNumbers) ? <StyledPaginationArrowRightDisabled /> : <StyledPaginationArrowRight />}
      </StyledPaginationButton>
    </StyledPaginationWrapper>
  );
}
