import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";

import {
  Container,
  Button,
  Row,
  Col,
} from "react-bootstrap";

const VentaPaquetes = () => {
  const apikey = useSelector((state) => state.token);
  const idVend = useSelector((state) => state.idVendedor);
  const dispatch = useDispatch();
  const nomCli = useRef(null);
  const idPaq = useRef(null);
  const cantMay = useRef(null);
  const cantMen = useRef(null);
  const [errorVenta, setErrorVenta] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const paquetes = useSelector((state) => state.paquetes);
  let venderPaquete = (e) => {
    setLoading(true);
    let cantGente =  Number(cantMay.current.value) + Number(cantMen.current.value);
    if (cantGente <= 10) {
      if(nomCli.current.value !== ""){
        let datosPOST = {
            idVendedor: idVend,
            nombreCliente: nomCli.current.value,
            idPaquete: idPaq.current.value,
            cantidadMayores: cantMay.current.value,
            cantidadMenores: cantMen.current.value,
          };
      fetch("https://destinos.develotion.com/ventas.php", {
        headers: { "Content-Type": "application/json", apikey: apikey },
        method: "POST",
        body: JSON.stringify(datosPOST),
      })
        .then((r) => r.json())
        .then((response) => {
          if (response.codigo === 200) {
            dispatch({ type: "NUEVAS_VENTAS", payload: response.idVenta});
            setErrorVenta(response.mensaje);
          } else {
            setErrorVenta(response.mensaje);
          }
          setLoading(false);
        });
      }else{
        setErrorVenta("Cliente no puede ser vacío.");
      setLoading(false);
      }
    } else {
      setErrorVenta("Cantidad de pasajeros excedida.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch("https://destinos.develotion.com/paquetes.php", {
      headers: { "Content-Type": "application/json", apikey: apikey },
      method: "GET",
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.codigo === 200) {
          dispatch({ type: "PAQUETES", payload: data.destinos});
        } else {
        }
        setLoading(false);
      });
  }, []);

  return (
    <Container fluid>
      <Row className="m-3">
        <Row className="mt-3">
          <Col>
           <label>Nombre Cliente:
                <input className="w-100" type="text" ref={nomCli} />
            </label>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>
            <select className="w-100" ref={idPaq}>
              <option value="0"> Seleccionar un paquete </option>
              {paquetes.map((paquete) => (
                <option key={paquete.id} value={paquete.id}>
                  {paquete.nombre}
                </option>
              ))}
            </select>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>
            <label>Cantidad Adultos:
                <input className="w-100" type="text" ref={cantMay} />
            </label>
           </Col>
          <Col>
            <label>Cantidad Menores:
                <input className="w-100" type="text" ref={cantMen} />
            </label>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>
            <Button
              variant="primary"
              disabled={isLoading}
              onClick={!isLoading ? venderPaquete : null}
              className="btnEnviar"
            >
              {isLoading ? "Cargando..." : "Enviar"}
            </Button>
          </Col>
        </Row>
        <Row>
          <Col className="mt-3">
            {errorVenta ? <div>{errorVenta}</div> : null}
          </Col>
        </Row>
      </Row>
    </Container>
  );
};

export default VentaPaquetes;
