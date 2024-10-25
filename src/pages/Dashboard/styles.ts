
import styled from 'styled-components';

export const Container = styled.div`
  padding: 2rem;

  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 2rem;

  .grid-item {
    background-color: #fff;
    padding: 1rem;
    border: 1px solid #ddd;

    h2 {
      margin-top: 0;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 1rem;

      th,
      td {
        border: 1px solid #ddd;
        padding: 0.5rem;
        text-align: left;
      }

      th {
        background-color: #f2f2f2;
      }

      tr:nth-child(even) td {
        background-color: #f9f9f9;
      }
    }

    .search-bar {
      display: flex;
      align-items: center;
      margin-top: 1rem;

      input {
        flex: 1;
        padding: 0.5rem;
        margin-right: 0.5rem;
      }

      button {
        padding: 0.5rem 1rem;
        background-color: blue;
        color: white;
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;

        svg {
          margin-right: 0.5rem;
        }
      }
    }
  }
`;
