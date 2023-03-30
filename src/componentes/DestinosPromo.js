import React from "react";
import { useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import { Container } from "react-bootstrap";

const DestinosPromo = () => {
    const ventasid = useSelector((state) => state.ventas);
    const paquetes = useSelector((state) => state.paquetes);

    let sortVentas = ventasid.sort((a, b) => {
      return a.id_paquete - b.id_paquete;
    });

    const arrayVentasXPaquete = paquetes.map((paq) => {
      let sum = 0;
      let arrayVentasXPaquete = sortVentas.filter((v) => v.id_paquete === paq.id);
      arrayVentasXPaquete.forEach((v) => sum++);
      return {
        nombre: paq.nombre,
        cantidad: sum,
      };
    });

    return (
      <Container fluid>
          <h2>Destinos en Promoción</h2>
          <br/>
        {arrayVentasXPaquete.filter((i) => i.cantidad === 0).map((item, i) => (
          <div className="destinosTop" key={i} id={i}>
            <p className="pnuevo"><strong>Destino: </strong> {item.nombre}</p>
            <p className="pnuevo"><strong>Cantidad de paquetes vendidos: </strong> {item.cantidad}</p>
        </div>
        ))}
      </Container>
    );
}

export default DestinosPromo
