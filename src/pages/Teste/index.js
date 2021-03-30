import React, { Component } from 'react';

// import Container from '../../components/Container';

export default class Teste extends Component {
  state = {
    filter: 'Grapefruit',
  };

  handleChange = e => {
    this.setState({ filter: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { filter } = this.state;

    // alert(`Your favorite flavor is: ${value}`);

    console.log(filter);
  };

  render() {
    const { filter } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        Pick your favorite flavor:
        <select value={filter} onChange={this.handleChange}>
          <option value="grapefruit">Grapefruit</option>
          <option value="lime">Lime</option>
          <option value="coconut">Coconut</option>
          <option value="mango">Mango</option>
        </select>
        <input type="submit" value="Filter" />
      </form>
    );
  }
}
