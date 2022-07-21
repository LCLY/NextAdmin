import React, { useEffect, useState } from 'react';
/* components */
import CheckAuth from '../../containers/CheckAuth';
import ModalComponent from 'components/ModalComponent';
import NavbarComponents from 'components/NavbarComponent';
/* 3rd party lib */
import Head from 'next/head';
import Link from 'next/link';
import { Breadcrumb, Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import { Dispatch, AnyAction } from 'redux';
import { toast, ToastContainer } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

/* Util */
import * as actions from 'store/actions/index';
import { RootState } from 'store/store';
import { IProject } from 'store/types/dashboard';
import styles from 'styles/Dashboard.module.scss';

interface SpecificProjectProps {}

type Props = SpecificProjectProps & StateProps & DispatchProps;

const SpecificProject: React.FC<Props> = ({
  loading,
  updatedProject,
  specificProject,
  onGetSpecificProject,
  onUpdateProject,
  onUpdateProjectClear,
}) => {
  /* ================================================== */
  /*  state */
  /* ================================================== */
  const router = useRouter();
  const { project_id } = router.query;
  const [show, setShow] = useState(false);
  const [data, setData] = useState<IProject>({ id: -1, title: '', description: '' });
  const [currentDetail, setCurrentDetail] = useState<IProject | null>(null); //for render

  /* ================================================== */
  /*  method */
  /* ================================================== */
  const handleClose = () => {
    setShow(false);
  };
  const handleSubmit = () => {
    onUpdateProject(data);
  };
  /* ================================================== */
  /*  useEffect */
  /* ================================================== */

  useEffect(() => {
    if (specificProject && typeof specificProject !== 'string') {
      setData(specificProject);
      setCurrentDetail(specificProject);
    }
  }, [specificProject]);

  useEffect(() => {
    if (updatedProject) {
      // if updated data come in, then update to that
      handleClose();
      toast.success('Update successful!');
      setData(updatedProject);
      setCurrentDetail(updatedProject);
      onUpdateProjectClear();
    }
  }, [updatedProject]);

  useEffect(() => {
    if (project_id !== undefined && typeof project_id === 'string') {
      onGetSpecificProject(parseInt(project_id));
    }
  }, [project_id]);
  /* ================================================== */
  /* ================================================== */
  return (
    <>
      <CheckAuth />
      <ToastContainer autoClose={1500} hideProgressBar={true} />
      <Head>
        <title>Project</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavbarComponents />
      {loading !== undefined && (
        <ModalComponent
          show={show}
          loading={loading}
          handleClose={handleClose}
          handleSubmit={handleSubmit}
          data={data}
          setData={setData}
        />
      )}
      <section className={styles.dashboard__section}>
        <Breadcrumb>
          <Breadcrumb.Item href="/projects">Home</Breadcrumb.Item>
          <Breadcrumb.Item active>{project_id}</Breadcrumb.Item>
        </Breadcrumb>

        <h1 className={styles.dashboard__header}>Project Details</h1>

        {typeof specificProject === 'string' ? (
          <div className={styles.dashboard__notfound}>
            <div>DATA NOT FOUND!</div>
            <div>
              <Link href="/projects">Back to home</Link>
            </div>
          </div>
        ) : (
          <>
            {currentDetail ? (
              <>
                <div className={styles.dashboard__detail}>
                  <div className={styles.dashboard__label}>Title:</div> {currentDetail.title}
                </div>
                <div className={styles.dashboard__detail}>
                  <div className={styles.dashboard__label}>Description:</div> {currentDetail.description}
                </div>
                <Button className={styles.dashboard__button} onClick={() => setShow(true)}>
                  Edit <FontAwesomeIcon className={styles['dashboard__button-icon']} icon={faPenToSquare} />
                </Button>
              </>
            ) : (
              <>Loading...</>
            )}
          </>
        )}
      </section>
    </>
  );
};

interface StateProps {
  loading?: boolean;
  specificProject?: IProject | null;
  updatedProject?: IProject | null;
}

const mapStateToProps = (state: RootState): StateProps => {
  return {
    loading: state.dashboard.loading,
    specificProject: state.dashboard.specificProject,
    updatedProject: state.dashboard.updatedProject,
  };
};

interface DispatchProps {
  onUpdateProject: typeof actions.updateProject;
  onGetSpecificProject: typeof actions.getSpecificProject;
  onUpdateProjectClear: typeof actions.updateProjectClear;
}
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): DispatchProps => {
  return {
    onUpdateProject: (project) => dispatch(actions.updateProject(project)),
    onGetSpecificProject: (project_id) => dispatch(actions.getSpecificProject(project_id)),
    onUpdateProjectClear: () => dispatch(actions.updateProjectClear()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SpecificProject);
