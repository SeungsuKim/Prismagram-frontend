import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import FatText from "../../Components/FatText";
import Loader from "../../Components/Loader";
import UserCard from "../../Components/UserCard";

const Wrapper = styled.div`
  height: 50vh;
`;

const Section = styled.div`
  display: grid;
  grid-gap: 25px;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 160px;
  margin-bottom: 50px;
`;

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
                key={user.id}
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
  loading: PropTypes.bool.isRequired,
  data: PropTypes.shape({
    searchPost: PropTypes.arrayOf(
      PropTypes.shape({
        likeCount: PropTypes.number.isRequired,
        files: PropTypes.arrayOf(
          PropTypes.shape({ url: PropTypes.string.isRequired })
        )
      })
    ),
    searchUser: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        avatar: PropTypes.string.isRequired,
        isFollowing: PropTypes.bool.isRequired,
        isSelf: PropTypes.bool.isRequired,
        username: PropTypes.string.isRequired
      })
    )
  })
};

export default SearchPresenter;
