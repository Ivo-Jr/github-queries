import React, { Component } from 'react';

import { FaGithubAlt, FaPlus } from 'react-icons/fa/';

import { Container, Form, SubmitButton } from './styles';

export default class Main extends Component {
  state = {
    newRepo: '',
  };

  handleInputChange = e => {
    this.setState({ newRepo: e.target.value });
  };
  // const { newRepo } = this.state;

  handleSubmit = e => {
    e.preventDefault();

    // console.log(this.state.newRepo);
  };

  render() {
    return (
      <Container>
        <h1>
          <FaGithubAlt />
          Repositórios
        </h1>

        <Form onSubmit={this.handleSubmit}>
          {/* // onSubmit={() => {}}> */}
          <input
            type="text"
            placeholder="Adicionar repositório"
            onChange={this.handleInputChange}
          />

          <SubmitButton disabled>
            <FaPlus color="#fff" size={14} type="submit" />
          </SubmitButton>
        </Form>
      </Container>
    );
  }
}
