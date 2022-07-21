import React from 'react';
import styles from 'styles/components/NavbarComponent.module.scss';
/* components */
/* 3rd party lib */
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { Navbar, Container } from 'react-bootstrap';
/* Util */
interface NavbarComponentProps {}

type Props = NavbarComponentProps;

const NavbarComponent: React.FC<Props> = () => {
  /* ================================================== */
  /*  state */
  /* ================================================== */
  /* ================================================== */
  /*  method */
  /* ================================================== */
  /* ================================================== */
  /*  useEffect */
  /* ================================================== */

  /* ================================================== */
  /* ================================================== */
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand>
            <Link href="/projects">
              <span className={styles.navbar__logo}>2EzAsia Demo</span>
            </Link>
          </Navbar.Brand>
          <Link href="/logout">
            <div className={styles.navbar__logout}>
              Logout
              <FontAwesomeIcon className={styles['navbar__logout-icon']} icon={faArrowRightFromBracket} />
            </div>
          </Link>
        </Container>
      </Navbar>
    </>
  );
};

export default NavbarComponent;
