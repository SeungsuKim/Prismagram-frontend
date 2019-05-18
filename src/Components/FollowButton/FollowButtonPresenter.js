import React from "react";
import PropTypes from "prop-types";
import Button from "../Button";

const FollowButtonPresenter = ({ isFollowing, onClick }) => (
  <Button text={isFollowing ? "Unfollow" : "Follow"} onClick={onClick} />
);

FollowButtonPresenter.propTypes = {
  isFollowing: PropTypes.bool.isRequired,
  onClick: PropTypes.func
};

export default FollowButtonPresenter;
