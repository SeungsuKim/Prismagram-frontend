import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import FatText from "../../Components/FatText";
import Loader from "../../Components/Loader";
import UserCard from "../../Components/UserCard";
import PostCard from "../../Components/PostCard";

const Wrapper = styled.div`
  height: minmax(50vh, auto);
`;

const Section = styled.div`
  display: grid;
  grid-gap: 25px;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  grid-auto-rows: 1fr;
  margin-bottom: 50px;
`;

const PostSection = styled(Section)`
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-auto-rows: 1fr;
  ::before {
    content: "";
    width: 0;
    padding-bottom: 100%;
    grid-row: 1 / 1;
    grid-column: 1 / 1;
  }
  > *:first-child {
    grid-row: 1 / 1;
    grid-column: 1 / 1;
  }
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
                id={user.id}
                username={user.username}
                isFollowing={user.isFollowing}
                url={user.avatar}
                isSelf={user.isSelf}
              />
            ))
          )}
        </Section>
        <PostSection>
          {data.searchPost.length === 0 ? (
            <FatText text="No posts found." />
          ) : (
            data.searchPost.map(post => (
              <PostCard
                key={post.id}
                likeCount={post.likeCount}
                commentCount={post.commentCount}
                file={post.files[0]}
              />
            ))
          )}
        </PostSection>
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
        id: PropTypes.string.isRequired,
        likeCount: PropTypes.number.isRequired,
        commentCount: PropTypes.number.isRequired,
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
