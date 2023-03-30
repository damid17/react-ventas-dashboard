import React from "react";
import { useSelector } from "react-redux";
import {  Redirect } from 'react-router-dom';
import ListaPaquetes from "./ListaPaquetes";
import VentaPaquetes from "./VentaPaquetes";
import CantidadVentas from "./CantidadVentas";
import DestinosPromo from "./DestinosPromo";
import DestinosTop from "./DestinosTop";
import PersonasDestino from "./PersonasDestino";
import PreciosDestinos from "./PreciosDestinos";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import "./style.css";

function Dashboard() {
  const logueado = useSelector(state => state.logueado);
  if(!logueado){
      return <Redirect to="/" />
  }
  const atras = () => {
    window.history.back();
  };
  return (
    <Container fluid>
      <Button className="btnatras2" variant="primary" onClick={atras}>
              Atrás
            </Button>
      <Row className="mt-5">
        <Col lg="4" sm="6">
          <Card className="card-stats">
            <Card.Body>
              <ListaPaquetes />
            </Card.Body>
          </Card>
        </Col>
        <Col lg="4" sm="6">
          <Card className="card-stats">
            <Card.Body>
              <VentaPaquetes />
            </Card.Body>
            <Card.Body>
              <PersonasDestino />
            </Card.Body>
          </Card>
        </Col>
        <Col lg="4" sm="6">
          <Card className="card-stats">
            <Card.Body>
              <CantidadVentas />
            </Card.Body>
            <Card.Body>
            <PreciosDestinos />
            </Card.Body>
            <Card.Body>
            <DestinosTop />
            </Card.Body>
            <Card.Body>
              <DestinosPromo />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;
