import React from "react";
import { withRouter } from "react-router-dom";
import { useQuery, useMutation } from "react-apollo-hooks";
import { GET_USER, LOG_OUT } from "./ProfileQueries";
import ProfilePresenter from "./ProfilePresneter";

export default withRouter(({ match: { params: { username } } }) => {
  const { data, loading } = useQuery(GET_USER, { variables: { username } });
  const logUserOutMutation = useMutation(LOG_OUT);
  return (
    <ProfilePresenter
      loading={loading}
      data={data}
      logout={logUserOutMutation}
    />
  );
});
