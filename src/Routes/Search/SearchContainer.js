import React from 'react';
import { withRouter } from "react-router-dom";
import queryString from "query-string";
import SearchPresenter from "./SearchPresenter";
import { useQuery } from 'react-apollo-hooks';
import { SEARCH } from './SearchQueries';

export default withRouter(({ location: { search } }) => {
  const { term } = queryString.parse(search);
  const { data, loading } = useQuery(SEARCH, {
    skip: !term,
    variables: { term }
  });
  return (
    <SearchPresenter
      term={term}
      loading={loading}
      data={data}
    />
  );
});