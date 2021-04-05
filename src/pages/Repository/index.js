import React, { Component } from 'react';
import { FaSpinner } from 'react-icons/fa/';
import { RiArrowGoBackFill } from 'react-icons/ri';
import { IoIosArrowBack } from 'react-icons/io';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import api from '../../services/api';

import Container from '../../components/Container';
import { Loading, Owner, IssueList, Form, PageAction } from './styles';

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
    newFilter: '',
    page: 1,
  };

  async componentDidMount() {
    const { match } = this.props;
    const repoName = decodeURIComponent(match.params.repository);
    const newFilter = localStorage.getItem('newFilter');

    const { page } = this.state;

    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: newFilter ? `${newFilter}` : 'all',
          per_page: 5,
          page: `${page}`,
        },
      }),
    ]);

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

  // loadIssues = async () => {
  //   const { match } = this.props;
  //   const { page } = this.state;

  //   const repoName = decodeURIComponent(match.params.repository);

  //   const response = await api.get(`/repos/${repoName}/issues`, {
  //     params: {
  //       per_page: 5,
  //       page,
  //     },
  //   });

  //   this.setState({ issues: response.data });
  // };

  handleSelectChange = e => {
    this.setState({ newFilter: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { newFilter } = this.state;

    this.setState({ newFilter });

    this.componentDidMount();
  };

  handlePage = async action => {
    const { page } = this.state;

    await this.setState({
      page: action === 'back' ? page - 1 : page + 1,
    });

    this.componentDidMount();

    //  rodapé page: 2
    //  pagina web: 3 -> consultar state: 3
    //  state: 2

    // this.loadIssues();
  };

  render() {
    const { repository, issues, loading, newFilter, page } = this.state;

    /**
     * Esse loading tem duas funções: 1º Espera o component didMount realizar a chamada a API
     para então carregar as informações. Logo, caso não tivesse esse carregamento, o react tentaria mostrar
     em tela uma informeção que anda não está dosponivel, assim o aplicativo quebraria e ele acusaria que o
     "repository.owner.avatar_url" é undefined. Obviamente isso aconteceria, pois estaria tentando mostrar algo
     que ainda não tem.
     2º O loading deixa a tela mais performatica e dá um aspecto de fluides e comunicação com o usuário.
    */
    if (loading) {
      return (
        <Loading loading={loading}>
          Carregando... <FaSpinner color="#fff" size={26} />{' '}
        </Loading>
      );
    }

    return (
      <Container>
        <Owner>
          <header>
            <Link to="/">
              Back to repositories <RiArrowGoBackFill size={16} />
            </Link>
          </header>
          <div>
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <h1>{repository.name}</h1>
            <p>{repository.description}</p>
          </div>
        </Owner>

        <IssueList>
          <Form onSubmit={this.handleSubmit}>
            <span>List of Issues:</span>
            <select value={newFilter} onChange={this.handleSelectChange}>
              <option value="all">all</option>
              <option value="open">open</option>
              <option value="closed">closed</option>
            </select>
            <input type="submit" value="Filter" />
          </Form>
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
        <PageAction>
          <button
            onClick={() => this.handlePage('back')}
            type="button"
            disabled={page < 2}
          >
            <IoIosArrowBack size={13} />
          </button>
          <span> Page {page} </span>
          <button onClick={() => this.handlePage('next')} type="button">
            <IoIosArrowBack size={13} className="rotated" />
          </button>
        </PageAction>
      </Container>
    );
  }
}
