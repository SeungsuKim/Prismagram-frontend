import { gql } from "apollo-boost";

export const TOOGLE_LIKE = gql`
  mutation toggleLike($postId: String!) {
    toogleLike(postId: $postId)
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($postId: String!, $text: String!) {
    addComment(posId: $postId, text: $text) {
      id
      text
      user {
        username
      }
    }
  }
`;