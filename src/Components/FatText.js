import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Text = styled.span`
  font-weight: 600;
`;

const FatText = ({ className, text }) => (
  <Text className={className}>{text}</Text>
);

FatText.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string.isRequired
};

export default FatText;
