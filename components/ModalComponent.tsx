import React from 'react';
/* components */
/* 3rd party lib */
import { Modal, Button, Form } from 'react-bootstrap';
import { IProject } from 'store/types/dashboard';

/* Util */
interface ModalComponentProps {
  show: boolean;
  loading: boolean;
  handleClose: () => any;
  handleSubmit: () => any;
  data: IProject;
  setData: React.Dispatch<React.SetStateAction<IProject>>;
}

type Props = ModalComponentProps;

const ModalComponent: React.FC<Props> = ({ show, data, loading, setData, handleClose, handleSubmit }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Project</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            value={data.title}
            placeholder="Enter project title here"
            onChange={(e) => setData({ ...data, title: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            value={data.description}
            as="textarea"
            rows={2}
            placeholder="Enter project description here"
            onChange={(e) => setData({ ...data, description: e.target.value })}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          {loading ? <>Loading...</> : <>Submit Changes</>}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalComponent;
