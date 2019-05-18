import { gql } from "apollo-boost";

export const GET_USER = gql`
  query seeUser($username: String!) {
    seeUser(username: $username) {
      id
      avatar
      username
      fullName
      isFollowing
      isSelf
      bio
      followingCount
      followerCount
      postCount
      posts {
        id
        likeCount
        commentCount
        files {
          url
        }
      }
    }
  }
`;
