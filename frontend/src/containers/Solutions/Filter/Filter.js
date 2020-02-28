import React, {Component} from 'react';

class Filter extends Component {
  render() {
    const list = this.props.items.map((item) => {
      return (
        <div
          key={item}
          onClick={() => this.props.onSelect(item)}>{item}</div>);
    })

    return (
      <div>
        {list}
      </div>
    );
  }
}

export default Filter;