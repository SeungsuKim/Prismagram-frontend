import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import FatText from "../../Components/FatText";
import Loader from "../../Components/Loader";
import UserCard from "../../Components/UserCard";

const Wrapper = styled.div`
  height: 50vh;
`;

const Section = styled.div``;

const SearchPresenter = ({ term, loading, data }) => {
  if (!term) {
    return (
      <Wrapper>
        <FatText text="Search for something" />
      </Wrapper>
    );
  }
  if (loading) {
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );
  }
  if (data && data.searchUser && data.searchPost) {
    return (
      <Wrapper>
        <Section>
          {data.searchUser.length === 0 ? (
            <FatText text="No users found." />
          ) : (
            data.searchUser.map(user => (
              <UserCard
                username={user.username}
                isFollowing={user.isFollowing}
                url={user.avatar}
                isSelf={user.isSelf}
              />
            ))
          )}
        </Section>
        <Section>
          {data.searchPost.length === 0 ? (
            <FatText text="No posts found." />
          ) : (
            data.searchPost.map(post => null)
          )}
        </Section>
      </Wrapper>
    );
  }
};

SearchPresenter.propTypes = {
  term: PropTypes.string,
  loading: PropTypes.bool.isRequired
};

export default SearchPresenter;
