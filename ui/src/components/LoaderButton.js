import React from "react";
import { Button } from "react-bootstrap";
import { FaSyncAlt } from 'react-icons/fa';
import "./LoaderButton.css";

export default ({
  isLoading,
  text,
  loadingText,
  className = "",
  disabled = false,
  variant="",
  ...props
}) =>
  <Button
    className={`LoaderButton ${className}`}
    disabled={disabled || isLoading}
    {...props}
  >
    {isLoading && <FaSyncAlt className="spinning" />}
    {!isLoading ? text : loadingText}
  </Button>;