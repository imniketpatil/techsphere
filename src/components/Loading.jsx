import React from "react";
import { Spinner } from "react-bootstrap";

function Loading() {
  return (
    <div className="loading">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
}

export default Loading;
