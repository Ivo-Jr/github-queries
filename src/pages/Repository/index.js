import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import api from '../../services/api';

import Container from '../../components/Container';
import { Loading, Owner, IssueList, Form } from './styles';

export default class Repository extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repository: PropTypes.string,
      }),
    }).isRequired,
  };

  state = {
    repository: {},
    issues: [],
    loading: true,
    filter: '',
    newFilter: 'all',
  };

  async componentDidMount() {
    const { match } = this.props;
    const repoName = decodeURIComponent(match.params.repository);
    const newFilter = localStorage.getItem('newFilter');

    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: `${newFilter}`,
          per_page: 5,
        },
      }),
    ]);

    // console.log(newFilter);

    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: false,
    });
  }

  componentDidUpdate(_, prevState) {
    const { newFilter } = this.state;

    if (prevState.newFilter !== newFilter) {
      localStorage.setItem('newFilter', newFilter);
    }
  }

  handleSelectChange = e => {
    this.setState({ newFilter: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { newFilter } = this.state;

    this.setState({ newFilter });

    this.componentDidMount();
  };

  render() {
    const { repository, issues, loading, newFilter } = this.state;

    if (loading) {
      return <Loading>Carregando...</Loading>;
    }

    return (
      <Container>
        <Owner>
          <Link to="/">Voltar aos repositórios</Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>

        <Form onSubmit={this.handleSubmit}>
          <span>List of Issues:</span>
          <select value={newFilter} onChange={this.handleSelectChange}>
            <option value="all">all</option>
            <option value="open">open</option>
            <option value="closed">closed</option>
          </select>
          <input type="submit" value="Filter" />
        </Form>

        <IssueList>
          {issues.map(issue => (
            <li key={String(issues.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                <strong>
                  <a href={issue.html_url} target="_blank" rel="noreferrer">
                    {issue.title}
                  </a>
                  {issue.labels.map(label => (
                    <span key={String(label.id)}>{label.name}</span>
                  ))}
                </strong>
                <p>{issue.user.login}</p>
              </div>
            </li>
          ))}
        </IssueList>
      </Container>
    );
  }
}
