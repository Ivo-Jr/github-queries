import styled from 'styled-components';

export const Loading = styled.div`
  color: #fff;
  font-size: 30px;
  font-weight: bold;
  font-style: italic;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const Owner = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;

  a {
    color: #3648ee;
    font-size: 16px;
    text-decoration: none;

    &:hover {
      color: #36a4ee;
    }
  }

  img {
    width: 120px;
    border-radius: 50%;
    margin-top: 20px;
  }

  h1 {
    font-size: 24px;
    margin-top: 10px;
  }

  p {
    margin-top: 5px;
    font-size: 14px;
    color: #666;
    line-height: 1.4;
    text-align: center;
    max-width: 400px;
  }
`;

export const IssueList = styled.ul`
  margin-top: 30px;
  padding-top: 10px;
  border-top: 1px solid #eee;
  list-style: none;

  li {
    display: flex;
    padding: 15px 10px;
    border: 1px solid #eee;
    border-radius: 4px;

    & + li {
      margin-top: 10px;
    }

    img {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: 2px solid #eee;
    }

    div {
      flex: 1;
      margin-left: 15px;

      strong {
        font-size: 16px;

        a {
          text-decoration: none;
          color: #333;

          &:hover {
            color: #36a4ee;
          }
        }

        span {
          background: #36a4ee;
          color: #333;
          border-radius: 2px;
          font-size: 12px;
          font-weight: 600;
          height: 20px;
          padding: 3px 4px;
          margin-left: 10px;
        }
      }

      p {
        margin-top: 5px;
        font-size: 12px;
        color: #999;
      }
    }
  }
`;

export const Form = styled.form`
  padding-bottom: 20px;
  flex: 1;
  justify-content: center;
  align-items: center;
  text-align: left;
  padding-left: 1%;

  span {
    padding-right: 7px;
  }

  select {
    margin-right: 5px;
    cursor: pointer;
  }

  input {
    padding: 1px 3px;
    border-radius: 3px;
    border: 1px solid black;
    color: black;
    /* font-weight: bold; */
    background: #eee;

    cursor: pointer;
  }
`;
