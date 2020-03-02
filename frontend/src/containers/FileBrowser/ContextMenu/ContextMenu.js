import React from 'react';

const contextMenu = (props) => {
  const options = props.options.map((option) => {
    return (
      <div
        key={option.label}
        onClick={option.action}>{option.label}</div>
    );
  })

  return (
    <div>
      {options}
    </div>
  );
}

export default contextMenu;

//TODO: Add Context menu over backdrop