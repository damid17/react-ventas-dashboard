import React from "react";
import { Pie } from "react-chartjs-2";
import { useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import { Container } from "react-bootstrap";

const PersonasDestino = () => {
  const ventasid = useSelector((state) => state.ventas);
  const paquetes = useSelector((state) => state.paquetes);

  let sortPaquetes = paquetes.sort((a, b) => {
    return a.id - b.id;
  });
  let sortVentas = ventasid.sort((a, b) => {
    return a.id_paquete - b.id_paquete;
  });

  const arrayGrafica = sortPaquetes.map(paq => {
    let sum = 0;
    let arrayGrafica = sortVentas.filter(v =>v.id_paquete===paq.id);
    arrayGrafica.forEach(v => sum += v.cantidad_mayores + v.cantidad_menores);
    return{
      nombre: paq.nombre,
      cantidad : sum
    }
  });
  
  return (
    <Container fluid>
      <div className="header">
        <h1 className="title">Personas por destino</h1>
      </div>
      <Pie
        data={{
          labels: [...arrayGrafica.map((label) => label.nombre)],
          datasets: [
            {
              data: [...arrayGrafica.map((data) => data.cantidad)],
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
              ],
              borderWidth: 1,
            },
          ],
        }}
      />
    </Container>
  );
};

export default PersonasDestino;
