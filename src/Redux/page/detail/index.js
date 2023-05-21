import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Navbar,
  Spinner,
} from "react-bootstrap";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import Banner from "../../component/Banner";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../../store/product/action";
import { addItem } from "../../store/cart/slice";

const DetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { entity, loading } = useSelector((state) => state.product);

  const fetchProductDetail = async (prodId) => {
    // const response = await httpService.get(`/product/${prodId}`);
    // console.log("response detail", response);
    await dispatch(getDetail(prodId));
  };
  useEffect(() => {
    // console.log("ds");
    fetchProductDetail(id);
  }, []);
  return (
    <>
      <Banner />
      <div style={{ backgroundColor: "#eff4fa", padding: "50px 0px" }}>
        <Container>
          {loading ? (
            <Spinner animation='border' />
          ) : (
            <Row>
              <Col sm='4'>
                <Card
                  style={{
                    width: "25rem",
                    border: "0px",
                  }}
                >
                  <img src={entity.image} width='100%' alt='' />
                  <Navbar bg='light'>
                    <Container>
                      <Navbar.Brand style={{ marginLeft: "35px" }} href='#home'>
                        Materi
                      </Navbar.Brand>
                    </Container>
                  </Navbar>
                  <br />
                  <Navbar bg=''>
                    <Container>
                      <Navbar.Brand style={{ marginLeft: "35px" }}>
                        Fasilitas
                      </Navbar.Brand>
                    </Container>
                    <hr />
                  </Navbar>
                  <Navbar bg=''>
                    <Container
                      style={{
                        display: "grid",
                        justifyContent: "flex-end",
                      }}
                    >
                      <Navbar.Brand>
                        <p
                          style={{
                            fontWeight: "bold",
                            color: "#ffc107",
                            fontSize: "16px",
                          }}
                        >
                          $ {entity.price}
                        </p>
                      </Navbar.Brand>
                    </Container>
                    <hr />
                  </Navbar>
                  <Card.Body style={{ textAlign: "center" }}>
                    <Button
                      onClick={() => dispatch(addItem(entity))}
                      variant='success'
                    >
                      Daftar Kelas
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
              <Col sm='8'>
                <Card
                  style={{
                    borderRadius: "20px",
                    border: "0px",
                    borderColor: "#146ebe",
                    paddingLeft: "40px",
                    paddingRight: "25",
                  }}
                >
                  <Card.Body>
                    <Card.Title>
                      <h2
                        style={{
                          color: "#202e41",
                          fontWeight: "bold",
                          paddingTop: "30px",
                          paddingBottom: "15px",
                        }}
                      >
                        Courses
                      </h2>
                    </Card.Title>
                    <Card.Text>
                      <h3>
                        <strong>{entity.title}</strong>
                      </h3>
                      <p style={{ fontSize: "16px" }}>{entity.description}</p>
                    </Card.Text>
                  </Card.Body>
                </Card>

                <Card
                  style={{
                    borderRadius: "20px",
                    border: "0px",
                    borderColor: "#146ebe",
                    paddingLeft: "40px",
                    paddingRight: "25px",
                    marginTop: "25px",
                  }}
                >
                  <Card.Body>
                    <Card.Title>
                      <h2
                        style={{
                          color: "#202e41",
                          fontWeight: "bold",
                          paddingTop: "30px",
                          paddingBottom: "15px",
                        }}
                      >
                        Fasilitas
                      </h2>
                    </Card.Title>
                    <Card.Text>
                      <h5>
                        <FontAwesomeIcon icon={faStar} />
                        <strong> E-Sertifikat</strong>
                      </h5>
                      <h5>
                        <FontAwesomeIcon icon={faStar} />
                        <strong> Portofolio</strong>
                      </h5>
                      <h5>
                        <FontAwesomeIcon icon={faStar} />
                        <strong> Job Connector</strong>
                      </h5>
                      <h5>
                        <FontAwesomeIcon icon={faStar} />
                        <strong> Career Development</strong>
                      </h5>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          )}
        </Container>
      </div>
    </>
  );
};

export default DetailPage;
