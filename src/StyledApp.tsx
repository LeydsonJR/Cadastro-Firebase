import styled from "styled-components";

export const Nav = styled.nav`
  ul {
    display: flex;
    align-items: center;
    list-style: none;
    padding: 0;
    margin: 0;
    justify-content: center;
    background-color: #007bff;
    height: 3rem;
    outline: none;
  }

  li {
    margin: 0 15px;
  }

  a {
    color: white;
    text-decoration: none;
    padding: 10px;
    text-transform: uppercase;
  }

  a:hover {
    text-decoration: overline;
  }
`;