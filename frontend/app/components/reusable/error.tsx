import React from "react";
interface errorvalidation{
    message : string
}
const error : React.FC<errorvalidation> = ({ message }) => {
  if (!message) return null;
  return <span>{message}</span>;
};

export default error;
