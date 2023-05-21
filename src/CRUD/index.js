import { useEffect, useState } from "react";
import { Col, Container, Row, Table, Button } from "react-bootstrap";
import CourseCreateModal from "./components/courseCreateModal";
import CourseEditeModal from "./components/courseEditModal";
import CourseDeleteModal from "./components/courseDeleteModal";
import courseService from "./utils/service";

const MateriCRUD = () => {
  const [showCreateModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState({});
  const [courses, setCourses] = useState([]);

  const toggleCreateModal = () => {
    setShowModal(!showCreateModal);
  };

  const handleAddCourse = (payload) => {
    courseService.addCourse(payload);
    toggleCreateModal();
    fetchCourses();
  };

  const fetchCourses = () => {
    const response = courseService.getCourses();
    setCourses(response.data);

  };

  const openEditModal = (course) => {
      setSelectedCourse(course);
      setShowEditModal(true)
  };

  const closeEditModal = () => {
      setSelectedCourse({});
      setShowEditModal(false)
  };

  const handleEditCours = (course) => {
const {id, ...others} = course;
courseService.updateCourse(id, others);
closeEditModal();
fetchCourses();
  };

  const openDeleteModal = (course) => {
    setSelectedCourse(course)
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setSelectedCourse({});
    setShowDeleteModal(false);
  };

  const handledeleteCourse = () => {
    const { id } = selectedCourse;
    courseService.deleteCourse(id);
    fetchCourses();
    closeDeleteModal();
  }

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <Container style={{ marginTop: "50px" }}>
      <Row>
        <Col md={{ span: 8, offset: 2 }}>
          <h3>List Course</h3>

          <Button
            style={{ marginBottom: "24px", marginTop: "24px" }}
            variant={"primary"}
            onClick={toggleCreateModal}
          >
            Create
          </Button>

          <Table>
            <thead>
              <tr>
                <td>No</td>
                <td>Name</td>
                <td>Description</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody>
              {courses.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.title}</td>
                    <td>{item.description}</td>
                    <td>
                      <Button variant={"warning"} onClick={() => openEditModal(item)}>Edit</Button>{" "}
                      <Button variant={"danger"}onClick={() => openDeleteModal(item)}>Delete</Button>
                    </td>
                  </tr>
                );
              })}
              {/* <tr>
                <td>2</td>
                <td>Course 2</td>
                <td>Desc 2</td>
                <td>
                  <Button variant={"warning"}>Edit</Button>{" "}
                  <Button variant={"danger"}>Delete</Button>
                </td>
              </tr> */}
            </tbody>
          </Table>
        </Col>
      </Row>
      <CourseCreateModal
        show={showCreateModal}
        handleClose={toggleCreateModal}
        handleSubmit={handleAddCourse}
      />
      <CourseEditeModal
        data={selectedCourse}
        show={showEditModal}
        handleClose={closeEditModal}
        handleSubmit={handleEditCours}
      />
      <CourseDeleteModal
        show={showDeleteModal}
        handleClose={closeDeleteModal}
        onConfirm={handledeleteCourse}
      />
    </Container>
  );
};

export default MateriCRUD;
