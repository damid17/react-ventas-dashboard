import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './style.css';
import {
  Container,
  Button,
} from "react-bootstrap";

const Registro = () => {
  const user = useRef(null);
  const password = useRef(null);
  let historial = useHistory();
  const dispatch = useDispatch();
  const [errorLogin, setErrorLogin] = useState(false);
  const atras = () => {
    window.history.back();
  };
  const registrarse = (e) => {
    setLoading(true);
    let usuario = user.current.value;
    let contrasenia = password.current.value;
    fetch("https://destinos.develotion.com/usuarios.php", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({ usuario: usuario, password: contrasenia }),
    })
      .then((r) => r.json())
      .then((response) => {
        if (response.codigo === 200) {
          dispatch({ type: "LOGIN", payload: {apikey: response.apiKey, idVendedor: response.id }});
          setErrorLogin("");
          historial.push("/dashboard");
          return <Redirect to="/dashboard" />;
        } else {
          setErrorLogin(response.mensaje);
        }
        setLoading(false);
      });
  };
  const [isLoading, setLoading] = useState(false);
  return (
    <Container fluid>
    <div class="stand">
      <div class="outer-screen">
        <div class="inner-screen">
          <Button className="btnAtras" variant="primary" onClick={atras}>
              Atrás
            </Button>
          <div class="form">
              <input type="text" ref={user} />
              <input type="password" ref={password} />
            <Button
              variant="primary"
              disabled={isLoading}
              onClick={!isLoading ? registrarse : null}
              className="btnLogin"
            >
              {isLoading ? "Cargando..." : "Registrarse"}
            </Button>
            <p>¿Ya tienes cuenta? <Link to="/">Inicia Sesión</Link></p>
            {errorLogin ? (
              <p><strong>Error al registrarse: </strong>{errorLogin} </p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  </Container>
  );
};

export default Registro;
