/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import api from '../../services/api';

export default class Repository extends Component {
  async componentDidMount() {
    const { match } = this.props;

    const repoName = decodeURIComponent(match.params.repository);

    await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`),
    ]);
  }

  render() {
    return <h1>Repository:</h1>;
  }
}
