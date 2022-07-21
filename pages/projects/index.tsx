import React, { useEffect, useState } from 'react';
/* components */
import CheckAuth from '../../containers/CheckAuth';
import NavbarComponents from 'components/NavbarComponent';
import ModalComponent from 'components/ModalComponent';

/* 3rd party lib */
import Head from 'next/head';
import Link from 'next/link';
import { connect } from 'react-redux';
import { Dispatch, AnyAction } from 'redux';
import { ToastContainer, toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { Breadcrumb, Table } from 'react-bootstrap';
/* Util */
import * as actions from 'store/actions/index';
import { RootState } from 'store/store';
import styles from 'styles/Dashboard.module.scss';
import { IProject } from 'store/types/dashboard';

interface DashboardProps {}

type Props = DashboardProps & StateProps & DispatchProps;

const Dashboard: React.FC<Props> = ({
  loading,
  projects,
  updatedProject,
  onGetProjects,
  onUpdateProject,
  onUpdateProjectClear,
}) => {
  /* ================================================== */
  /*  state */
  /* ================================================== */
  const [show, setShow] = useState(false);
  const [tableData, setTableData] = useState<IProject[] | null>(null);
  const [selected, setSelected] = useState<IProject | null>(null);
  const [data, setData] = useState<IProject>({ id: -1, title: '', description: '' });
  /* ================================================== */
  /*  method */
  /* ================================================== */
  const handleClose = () => {
    setShow(false);
    setSelected(null);
  };
  const handleSubmit = () => {
    onUpdateProject(data);
  };
  /* ================================================== */
  /*  useEffect */
  /* ================================================== */
  useEffect(() => {
    if (updatedProject !== null && updatedProject !== undefined) {
      // when updatedProject returns a value, close the modal and clear the updatedProject in redux
      handleClose();
      toast.success('Update successful!');
      onUpdateProjectClear();
      setTableData((prevState) => {
        // manipulate the table
        if (prevState) {
          // first find the index of the updated project within the existing array
          let foundIndex = prevState?.findIndex((child) => child.id === updatedProject.id);
          // replace the index with the updated object
          prevState[foundIndex] = updatedProject;
          return prevState;
        }
        return prevState;
      });
    }
  }, [updatedProject]);

  useEffect(() => {
    if (selected) {
      // make a new state to store the selected data to not interact with the original data when changing input value
      setData(selected);
    }
  }, [selected]);

  useEffect(() => {
    // when projects are loaded, store the data into tableData
    if (projects) {
      setTableData(projects);
    }
  }, [projects]);

  useEffect(() => {
    onGetProjects();
  }, []);
  /* ================================================== */
  /* ================================================== */
  return (
    <>
      <CheckAuth />
      <ToastContainer autoClose={1500} hideProgressBar={true} />
      <Head>
        <title>Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* only show if a child is selected */}
      {loading !== undefined && (
        <ModalComponent
          show={show && selected !== null}
          loading={loading}
          handleClose={handleClose}
          handleSubmit={handleSubmit}
          data={data}
          setData={setData}
        />
      )}

      <NavbarComponents />
      <section className={styles.dashboard__section}>
        <Breadcrumb>
          <Breadcrumb.Item active>Home</Breadcrumb.Item>
        </Breadcrumb>
        {tableData ? (
          <Table striped>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tableData
                .sort((a, b) => a.id - b.id)
                .map((child) => {
                  return (
                    <tr key={child.id}>
                      <td>{child.id}</td>
                      <td>{child.title}</td>
                      <td>{child.description}</td>
                      <td className="flex-align-center">
                        <Link href={`/projects/${child.id}`}>Details</Link>
                        <div>
                          <FontAwesomeIcon
                            className={styles.dashboard__icon}
                            icon={faPenToSquare}
                            onClick={() => {
                              setShow(true);
                              setSelected(child);
                            }}
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        ) : (
          <div>Loading...</div>
        )}
      </section>
    </>
  );
};

interface StateProps {
  loading?: boolean;
  projects?: IProject[] | null;
  updatedProject?: IProject | null;
}

const mapStateToProps = (state: RootState): StateProps => {
  return {
    loading: state.dashboard.loading,
    projects: state.dashboard.projects,
    updatedProject: state.dashboard.updatedProject,
  };
};

interface DispatchProps {
  onGetProjects: typeof actions.getProjects;
  onUpdateProject: typeof actions.updateProject;
  onUpdateProjectClear: typeof actions.updateProjectClear;
}
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): DispatchProps => {
  return {
    onGetProjects: () => dispatch(actions.getProjects()),
    onUpdateProject: (project) => dispatch(actions.updateProject(project)),
    onUpdateProjectClear: () => dispatch(actions.updateProjectClear()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
