import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import './style.css';

import {
  Container,
} from "react-bootstrap";
const CantidadVentas = () => {
    const cantVentas = useSelector((state) => state.cantVent)
    return (
        <Container fluid>
            <div>
                <h2>Cantidad de ventas: {cantVentas}</h2>
            </div>
        </Container>
    )
}

export default CantidadVentas
