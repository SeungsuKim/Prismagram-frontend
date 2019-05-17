import React from 'react'
import styled from "styled-components";
import PropTypes from "prop-types";

const getSize = size => {
  let number;
  if (size === "sm") {
    number = 30;
  } else if (size === "md") {
    number = 50;
  } else if (size === "lg") {
    number = 150;
  }
  return `
    width: ${number}px;
    height: ${number}px;
  `;
}

const Container = styled.div`
  ${props => getSize(props.size)}
  background-image: url(${props => props.url});
  background-size: cover;
  border-radius: 50%;
`;

const Avatar = ({ size = "sm", url }) => <Container size={size} url={url ? url : "https://instagram.fopo2-2.fna.fbcdn.net/vp/f38c782b9a532d35259b0e15c52f5bfe/5D7C0DF1/t51.2885-19/44884218_345707102882519_2446069589734326272_n.jpg?_nc_ht=instagram.fopo2-2.fna.fbcdn.net"} />

Avatar.propTypes = {
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  url: PropTypes.string
}

export default Avatar;