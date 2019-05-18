import React from "react";
import { withRouter } from "react-router-dom";
import { useQuery } from "react-apollo-hooks";
import { GET_USER } from "./ProfileQueries";
import ProfilePresenter from "./ProfilePresneter";

export default withRouter(({ match: { params: { username } } }) => {
  const { data, loading } = useQuery(GET_USER, { variables: { username } });
  return <ProfilePresenter loading={loading} data={data} />;
});
