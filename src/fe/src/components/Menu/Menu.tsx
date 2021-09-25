import React, { FunctionComponent } from 'react';
import styles from './Menu.module.scss';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import {NavLink, RouteComponentProps, withRouter} from 'react-router-dom';
import { Github, QuestionCircle, At, Book, Gear } from "react-bootstrap-icons";

const getActiveKey = (pathname: string): string => {
  // '/' to '/'
  // '/other/another' to '/other/'

  if (pathname === '/') return pathname;

  return `/${pathname.split('/')[1]}/`;
};

const Menu: FunctionComponent<RouteComponentProps> = (props: RouteComponentProps): JSX.Element => {
  const { location } = props;
  const activeKey = getActiveKey(location.pathname);

  return (
    <Container>
    <Navbar className={styles.prfMenu} expand="md">
      <Navbar.Brand as={NavLink} to={'/'}>Prf - β</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse className={styles.prfNav} id="basic-navbar-nav">
        <Nav className={['mr-auto', styles.prfNavWrapper].join(' ')}>
          <Nav.Link
            active={false}
            href={'https://github.com/snowinmars/aristotle.paraphrase'}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github />
          </Nav.Link>
          <Nav.Link as={NavLink} to={'/'} isActive={() => activeKey === '/'}><QuestionCircle /></Nav.Link>
          <NavDropdown className={styles.prfNavBooksDropdown} active={activeKey === '/books/'} title={<Book />} id={styles.prfNavBooksDropdown}>
            <NavDropdown.Item as={NavLink} to="/books/">Список</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item as={NavLink} to="/books/1">Метафизика, 1</NavDropdown.Item>
          </NavDropdown>
          <Nav.Link as={NavLink} isActive={() => activeKey === '/contacts/'} to="/contacts/"> <At /> </Nav.Link>
          <Nav.Link as={NavLink} isActive={() => activeKey === '/settings/'} to={"/settings/"}><Gear /></Nav.Link>
        </Nav>
        <Form>
          <FormControl type="text" placeholder="TBD" disabled className={'mr-sm-2'} />
        </Form>
      </Navbar.Collapse>
    </Navbar>
    </Container>
  );
};

export default withRouter(Menu);
