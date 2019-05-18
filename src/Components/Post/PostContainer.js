import React, { useState } from "react";
import PropTypes from "prop-types";
import { useMutation } from "react-apollo-hooks";
import useInput from "../../Hooks/useInput";
import PostPresenter from "./PostPresenter";
import { TOOGLE_LIKE, ADD_COMMENT } from "./PostQueries";
import { toast } from "react-toastify";

const PostContainer = ({
  id,
  user,
  files,
  likeCount,
  isLiked,
  comments,
  createdAt,
  caption,
  location
}) => {
  const [isLikedState, setIsLiked] = useState(isLiked);
  const [likeCountState, setLikeCount] = useState(likeCount);
  const [currentItem, setCurrentItem] = useState(0);
  const [selfComments, setSelfComments] = useState([]);
  const [commentLoading, setCommentLoading] = useState(false);
  const comment = useInput("");

  const toggleLikeMutation = useMutation(TOOGLE_LIKE, {
    variables: { postId: id }
  });
  const addCommentMutation = useMutation(ADD_COMMENT, {
    variables: { postId: id, text: comment.value }
  });

  const slideNext = () => {
    const totalFiles = files.length;
    if (currentItem === totalFiles - 1) {
      setCurrentItem(0);
    } else {
      setCurrentItem(currentItem + 1);
    }
  };
  const slidePrev = () => {
    const totalFiles = files.length;
    if (currentItem === 0) {
      setCurrentItem(totalFiles - 1);
    } else {
      setCurrentItem(currentItem - 1);
    }
  };
  const toggleLike = () => {
    if (isLikedState) {
      setIsLiked(false);
      setLikeCount(likeCountState - 1);
    } else {
      setIsLiked(true);
      setLikeCount(likeCountState + 1);
    }
    try {
      toggleLikeMutation();
    } catch {
      setIsLiked(!isLikedState);
      toast.error("Can't like/unlike the post.");
    }
  };
  const onKeyPress = async e => {
    const { which } = e;
    if (which === 13) {
      e.preventDefault();
      if (comment.value !== "") {
        setCommentLoading(true);
        comment.setValue("");
        try {
          const {
            data: { addComment }
          } = await addCommentMutation();
          setSelfComments([...selfComments, addComment]);
        } catch {
          toast.error("Can't add comment");
        }
        setCommentLoading(false);
      }
    }
  };
  console.log(commentLoading);
  return (
    <PostPresenter
      user={user}
      files={files}
      likeCount={likeCountState}
      isLiked={isLikedState}
      comments={comments}
      newComment={comment}
      createdAt={createdAt}
      setIsLiked={setIsLiked}
      setLikeCount={setLikeCount}
      caption={caption}
      location={location}
      currentItem={currentItem}
      slidePrev={slidePrev}
      slideNext={slideNext}
      toggleLike={toggleLike}
      onKeyPress={onKeyPress}
      selfComments={selfComments}
      commentLoading={commentLoading}
    />
  );
};

PostContainer.propTypes = {
  id: PropTypes.string.isRequired,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    username: PropTypes.string.isRequired
  }).isRequired,
  files: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired
    })
  ).isRequired,
  likeCount: PropTypes.number.isRequired,
  isLiked: PropTypes.bool.isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired
      }).isRequired
    })
  ),
  createdAt: PropTypes.string.isRequired,
  location: PropTypes.string,
  caption: PropTypes.string.isRequired
};

export default PostContainer;
