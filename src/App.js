import "./App.css";
import Spline from "@splinetool/react-spline";
import { Text, Container } from "@nextui-org/react";
function App() {
  return (
    <div className="App">
      <Spline
        className="imagePrincipal"
        scene="https://prod.spline.design/Vk8MhpNxBYU3anGL/scene.splinecode"
      />
      <Container className="containerPrincipal">
        <Text>Presentacion</Text>
      </Container>
    </div>
  );
}

export default App;
