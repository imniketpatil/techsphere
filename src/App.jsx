import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.min.css";
import Menu from "./components/Menu";
import MusicPlayer from "./components/MusicPlayer";
import SongSection from "./components/SongSection";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      {/* <Container style={{ width: "100%" }}> */}
      <Row style={{ margin: "0", padding: "0", backgroundColor: "gray" }}>
        <Col sm xl="2">
          <Menu />
        </Col>
        <Col sm="hide" xl="4">
          <SongSection />
        </Col>
        <Col sm xl="6" style={{ display: "flex", justifyContent: "center" }}>
          <MusicPlayer />
        </Col>
      </Row>
      {/* </Container> */}
    </>
  );
}

export default App;
