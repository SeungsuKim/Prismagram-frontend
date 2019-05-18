import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Helmet } from "rl-react-helmet";
import Loader from "../../Components/Loader";
import Avatar from "../../Components/Avatar";
import FatText from "../../Components/FatText";
import FollowButton from "../../Components/FollowButton";
import PostCard from "../../Components/PostCard";

const Wrapper = styled.div`
  min-height: 100vh;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 100px;
`;

const HeaderColumn = styled.div`
  &:first-child {
    margin-left: 50px;
    margin-right: 80px;
  }
`;

const UsernameRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
`;

const ExtendedFollowButton = styled(FollowButton)`
  width: 100px;
`;

const Username = styled.span`
  font-size: 25px;
  display: block;
  margin-right: 20px;
`;

const Counts = styled.ul`
  display: flex;
`;

const Count = styled.li`
  font-size: 16px;
  margin-bottom: 30px;
  &:not(:last-child) {
    margin-right: 40px;
  }
`;

const FullName = styled(FatText)`
  font-size: 16px;
`;

const Bio = styled.p`
  margin: 10px 0;
`;

const Posts = styled.div`
  display: grid;
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

const ProfilePresenter = ({ loading, data }) => {
  if (loading) {
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );
  }
  if (data && data.seeUser) {
    const {
      seeUser: {
        id,
        avatar,
        username,
        fullName,
        isFollowing,
        isSelf,
        bio,
        followingCount,
        followerCount,
        postCount,
        posts
      }
    } = data;
    return (
      <Wrapper>
        <Helmet>
          <title>{username} | Prismagram</title>
        </Helmet>
        <Header>
          <HeaderColumn>
            <Avatar size="lg" url={avatar} />
          </HeaderColumn>
          <HeaderColumn>
            <UsernameRow>
              <Username>{username}</Username>
              {!isSelf && (
                <ExtendedFollowButton id={id} isFollowing={isFollowing} />
              )}
            </UsernameRow>
            <Counts>
              <Count>
                <FatText text={String(postCount)} />{" "}
                {postCount === 1 ? "post" : "posts"}
              </Count>
              <Count>
                <FatText text={String(followerCount)} />{" "}
                {followerCount === 1 ? "follower" : "followers"}
              </Count>
              <Count>
                <FatText text={String(followingCount)} />{" "}
                {followingCount === 1 ? "following" : "followings"}
              </Count>
            </Counts>
            <FullName text={fullName} />
            <Bio>{bio}</Bio>
          </HeaderColumn>
        </Header>
        <Posts>
          {posts &&
            posts.map(post => (
              <PostCard
                key={post.id}
                likeCount={post.likeCount}
                commentCount={post.commentCount}
                file={post.files[0]}
              />
            ))}
        </Posts>
      </Wrapper>
    );
  }
};

ProfilePresenter.propTypes = {
  loading: PropTypes.bool.isRequired,
  data: PropTypes.shape({
    seeUser: PropTypes.shape({
      id: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      fullName: PropTypes.string.isRequired,
      isFollowing: PropTypes.bool.isRequired,
      isSelf: PropTypes.bool.isRequired,
      bio: PropTypes.string,
      followingCount: PropTypes.number.isRequired,
      followerCount: PropTypes.number.isRequired,
      postCount: PropTypes.number.isRequired,
      posts: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          likeCount: PropTypes.number.isRequired,
          commentCount: PropTypes.number.isRequired,
          files: PropTypes.arrayOf(
            PropTypes.shape({
              url: PropTypes.string.isRequired
            })
          )
        })
      )
    })
  })
};

export default ProfilePresenter;
