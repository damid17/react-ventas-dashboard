import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import './style.css';

import {
  Container,
} from "react-bootstrap";
const ListaPaquetes = () => {
  const apikey = useSelector((state) => state.token);
  const idVend = useSelector((state) => state.idVendedor);
  const idVentas = useSelector((state) => state.idVentas);
  const dispatch = useDispatch();
  const ventasid = useSelector((state) => state.ventas);
  const paquetes = useSelector((state) => state.paquetes);

  useEffect(() => {
    fetch(`https://destinos.develotion.com/ventas.php?idVendedor=${idVend}`, {
      headers: { "Content-Type": "application/json", apikey: apikey },
      method: "GET",
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.codigo === 200) {
          dispatch({ type: "VENTAS", payload: data.ventas});
        }
      });
  }, [idVentas]);

  dispatch({ type: "CANT_VENTAS", payload: ventasid.length});

  function precioFinal (identificador,  cantA, cantN){
    let filPaquete = [];
    paquetes.forEach((item) => (item.id === identificador)?filPaquete = item : null);
    let preciomayores = cantA * filPaquete.precio_mayor;
    let preciomenores = cantN * filPaquete.precio_menor;
    return preciomayores + preciomenores;
  }

  function nombrePaquete (identificador,  cantA, cantN){
    let filPaquete = [];
    paquetes.forEach((item) => (item.id === identificador)?filPaquete = item : null);
    return filPaquete.nombre;
  }

  return (
    <Container fluid>
      {ventasid.map((item, i) => (
        <div className="divVentas" key={i} id={item.idVenta}>
        <div className="col-lg-6 col-md-6 col-xs-6 b-right pad-5">
            <p className="pnuevo"><strong>Cliente: </strong> {item.nombre_cliente}</p>
            <p className="pnuevo"><strong>Destino: </strong> {nombrePaquete(item.id_paquete)}</p>
        </div>
        <div className="col-lg-6 col-md-6 col-xs-6 pad-5">
            <p className="pnuevo"><strong>Pasajeros: </strong>{item.cantidad_mayores} adultos y {item.cantidad_menores} menores.</p>
            <p className="pnuevo"><strong>Precio Final: </strong> {precioFinal(item.id_paquete, item.cantidad_mayores, item.cantidad_menores)}</p></div>
        </div>
      ))}
    </Container>
  );
};

export default ListaPaquetes;
