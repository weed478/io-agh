import React from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";
import daysUntil from "./utils/dateConverter";
import { orderStatusColor, orderStatusText } from "./model/order";

const StatusPill = ({ status }) => {
  return (
    <span className={`badge bg-${orderStatusColor[status]}`}>{orderStatusText[status]}</span>
  );
};

const OrderListItem = ({ order, onClick }) => {

  return (
    <Card onClick={onClick} className="mb-3" style={{ cursor: "pointer" }} >
      <Card.Body>
        <Row className="align-items-center">
          <Col xs={4}>
            <Card.Title>{order.car.model}</Card.Title>
            <Card.Subtitle className="text-muted">{order.car.year}</Card.Subtitle>
          </Col>

          <Col xs={2}>
            <Card.Text>{order.client.firstName} {order.client.lastName}</Card.Text>
          </Col>

          <Col xs={2} className="d-flex flex-column align-items-start">
            <div className="fw-bold d-flex justify-content-between w-100 gap-2">
              <Card.Text className="mb-0">{Number(order.cost).toFixed(2)}</Card.Text>
              <p className="mb-0">PLN</p>
            </div>
            <div className="d-flex justify-content-between w-100 gap-2">
              <Card.Text className="mb-0">{Number(order.profit).toFixed(2)}</Card.Text>
              <p className="mb-0">PLN</p>
            </div>
          </Col>

          <Col className="text-center" xs={2}>
            <StatusPill status={order.status} />
          </Col>

          <Col xs={2}>
            <Card.Text>{order.dueDate.toLocaleDateString("pl-PL", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })}</Card.Text>
          </Col>
        </Row>
      </Card.Body>
      <Badge pill className="bg-danger position-absolute top-100 start-100 translate-middle">
        {daysUntil(order.dueDate) + "d"}
      </Badge>
    </Card>
  );
};

export default OrderListItem;
