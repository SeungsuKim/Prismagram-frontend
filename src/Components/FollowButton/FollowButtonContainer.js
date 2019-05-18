import React, { useState } from "react";
import PropTypes from "prop-types";
import { useMutation } from "react-apollo-hooks";
import { FOLLOW, UNFOLLOW } from "./FollowButtonQueries";
import FollowButtonPresenter from "./FollowButtonPresenter";
import { toast } from "react-toastify";

const FollowButtonContainer = ({ className, isFollowing, id }) => {
  const [isFollowingState, setIsFollowingState] = useState(isFollowing);

  const followMutation = useMutation(FOLLOW, { variables: { id } });
  const unfollowMutation = useMutation(UNFOLLOW, { variables: { id } });

  const onClick = () => {
    if (isFollowingState) {
      setIsFollowingState(false);
      try {
        unfollowMutation();
      } catch {
        setIsFollowingState(true);
        toast.error("Can't unfollow the user.");
      }
    } else {
      setIsFollowingState(true);
      try {
        followMutation();
      } catch {
        setIsFollowingState(false);
        toast.error("Can't follow the user.");
      }
    }
  };

  return (
    <FollowButtonPresenter
      className={className}
      isFollowing={isFollowingState}
      onClick={onClick}
    />
  );
};

FollowButtonContainer.propTypes = {
  className: PropTypes.string,
  isFollowing: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired
};

export default FollowButtonContainer;
