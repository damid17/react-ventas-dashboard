import React, { useState, useRef, useEffect } from "react";
import { Bar, Pie } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import { Container } from "react-bootstrap";

const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };
const PreciosDestinos = () => {
  const paquetes = useSelector((state) => state.paquetes);
  return (
    <Container fluid>
      <div className="header">
        <h2 className="title">Promedio de Precios</h2>
      </div>
      <Bar
        data={{
          labels: [...paquetes.map((label) => label.nombre)],
          datasets: [
            {
              label: "Escala",
              data: [
                ...paquetes.map(
                  (data) => (data.precio_mayor + data.precio_menor) / 2
                ),
              ],
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
        options={options}
      />
    </Container>
  );
};

export default PreciosDestinos;
