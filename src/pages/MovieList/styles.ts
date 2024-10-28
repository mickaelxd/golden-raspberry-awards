import styled from 'styled-components';

export const Container = styled.div`
  padding: 2rem;

  h1 {
    margin-bottom: 1rem;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 1rem;

    th,
    td {
      border: 1px solid #ddd;
      padding: 0.5rem;
      text-align: left;
      vertical-align: top;
    }

    th {
      background-color: #f2f2f2;
      position: relative;

      input,
      select {
        width: 100%;
        margin-top: 0.5rem;
        padding: 0.25rem;
      }
    }
  }

  .pagination {
    display: flex;
    align-items: center;

    button {
      padding: 0.5rem 1rem;
      margin-right: 1rem;
    }

    span {
      margin-right: 1rem;
    }

    select {
      padding: 0.5rem;
    }
  }
`;
