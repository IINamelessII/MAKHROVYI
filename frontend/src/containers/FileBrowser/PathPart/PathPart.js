import React from 'react';

const pathPart = (props) => {
  return (
    <span>
      <span onClick={props.goToPath}>{props.pathPartName}</span>
      {props.pathPartName !== '/' ? "/" : ''}
    </span>
  );
}

export default pathPart;