import React from 'react'
import styled from "styled-components";
import PropTypes from "prop-types";
import FatText from "../../Components/FatText";

const Wrapper = styled.div`
  height: 50vh;
  text-align: center;
`

const SearchPresenter = ({ term, loading }) => (
  <Wrapper>
    {!term && <FatText text="Search for something" />}
  </Wrapper>
)

SearchPresenter.propTypes = {
  term: PropTypes.string,
  loading: PropTypes.bool.isRequired
};

export default SearchPresenter;