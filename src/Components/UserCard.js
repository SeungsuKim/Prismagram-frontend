import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Avatar from "./Avatar";
import FatText from "./FatText";
import Button from "./Button";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Card = styled.div`
  ${props => props.theme.whiteBox}
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const ExtendedAvatar = styled(Avatar)`
  margin-bottom: 15px;
`;

const ExtendedLink = styled(Link)`
  color: inherit;
  margin-bottom: 10px;
`;

const UserCard = ({ username, isFollowing, isSelf, url }) => (
  <Card>
    <ExtendedAvatar url={url} size="md" />
    <ExtendedLink to={`/${username}`}>
      <FatText text={username} />
    </ExtendedLink>
    {!isSelf && <Button text={isFollowing ? "Unfollow" : "Follow"} />}
  </Card>
);

UserCard.propTypes = {
  username: PropTypes.string.isRequired,
  isFollowing: PropTypes.bool.isRequired,
  isSelf: PropTypes.bool.isRequired,
  url: PropTypes.string
};

export default UserCard;
