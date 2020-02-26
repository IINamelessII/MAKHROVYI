import React from 'react';

const dir = (props) => {
  return (
    <div onClick={props.open}>It's Dir {props.name}</div>
  );
}

export default dir;