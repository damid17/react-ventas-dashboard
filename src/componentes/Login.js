import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import { Container, Button} from "react-bootstrap";

const Login = () => {
  const user = useRef(null);
  const password = useRef(null);
  const historial = useHistory();
  const dispatch = useDispatch();
  const [errorLogin, setErrorLogin] = useState(false);
  let loguearse = (e) => {
    setLoading(true);
    let usuario = user.current.value;
    let contrasenia = password.current.value;
    fetch("https://destinos.develotion.com/login.php", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({ usuario: usuario, password: contrasenia }),
    })
      .then((r) => r.json())
      .then((response) => {
        if (response.codigo === 200) {
          dispatch({
            type: "LOGIN",
            payload: { apikey: response.apiKey, idVendedor: response.id },
          });
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
            <div class="form">
                <input type="text" ref={user} />
                <input type="password" ref={password} />
              <Button
                variant="primary"
                disabled={isLoading}
                onClick={!isLoading ? loguearse : null}
                className="btnLogin"
              >
                {isLoading ? "Cargando..." : "Iniciar Sesión"}
              </Button>
              <p>¿No tienes usuario? <Link to="/registro">Regístrate</Link></p>
              {errorLogin ? (
                <p><strong>Error al iniciar sesión:</strong> {errorLogin} </p>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Login;
