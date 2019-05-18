import React from "react";
import PropTypes from "prop-types";
import Button from "../Button";

const FollowButtonPresenter = ({ className, isFollowing, onClick }) => (
  <Button
    className={className}
    text={isFollowing ? "Unfollow" : "Follow"}
    onClick={onClick}
  />
);

FollowButtonPresenter.propTypes = {
  className: PropTypes.string,
  isFollowing: PropTypes.bool.isRequired,
  onClick: PropTypes.func
};

export default FollowButtonPresenter;
