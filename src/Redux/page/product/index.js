import { useEffect } from "react";
import { Container, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import BannerUtama from "../../component/BannerUtama";
import { getAll } from "../../store/product/action/";
import { useDispatch, useSelector } from "react-redux";

const ProductPage = () => {
  const { entities } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fetchProducts = async () => {
    dispatch(getAll());
  };

  const goToDetail = (prodId) => {
    navigate(`/detail/${prodId}`);
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div style={{ backgroundColor: "#eff4fa" }}>
      <BannerUtama />
      <Container
        style={{
          display: "flex",
          gap: "12px",
          flexWrap: "wrap",
          padding: "50px 0px",
          justifyContent: "center",
        }}
      >
        {entities.map((product) => {
          return (
            <Card
              key={product.id}
              onClick={() => goToDetail(product.id)}
              style={{ width: "18rem", cursor: "pointer" }}
            >
              <Card.Img variant='top' src={product.image} />
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>{product.description}</Card.Text>
                <Card.Text>$ {product.price}</Card.Text>
                {/* <Button variant='primary'>Go somewhere</Button> */}
              </Card.Body>
            </Card>
          );
        })}
      </Container>
    </div>
  );
};

export default ProductPage;
