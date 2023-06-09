'use client';

import { useCallback, useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { ButtonGroup, Dropdown } from "react-bootstrap";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import DropdownToggle from "react-bootstrap/esm/DropdownToggle";
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";
import { BiCopy } from "react-icons/bi";
import { FaCheck, FaMinus, FaPlus } from "react-icons/fa";
import { orderStatusColor, orderStatusText, updateOrder, partsCost, partsMaxDate, deleteOrder } from "@/model/order";
import EditOrder from "./EditOrder";
import AddPart from "./AddPart";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import PartListItem from "@/app/mechanic/home/PartListItem";
import { mailUpdateStatus } from "@/app/sendMail";

const OrderDetails = ({ order, deselectOrder }) => {
  const [isCopied, setIsCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setIsEditing(false);
  }, [order]);

  const handleStatusChange = (status) => {
    order.status = status;
    updateOrder(order);
    mailUpdateStatus(order.client.email, order.id, orderStatusText[status]);
  };

  const handleCopyClick = () => {
    const orderLink = `${window.location.origin}/client/order?orderId=${order.id}`;
    navigator.clipboard.writeText(orderLink);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 5000);
  };

  const handleDeleteClick = () => {
    deleteOrder(order);
    deselectOrder();
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  return (
    <>
      {isEditing ? (<EditOrder order={order} onSave={handleSaveEdit} onCancel={handleCancelEdit} />) : (
        <Card>
          <Card.Header>
            <Row className="align-items-center">
              <div className="rounded-pill p-0 ms-1 align-self-stretch" style={{ width: "0.5rem", backgroundColor: order.car.color }}></div>
              <Col>
                <Card.Title>{order.car.model}</Card.Title>
                <Card.Subtitle className="text-muted">{order.car.year}</Card.Subtitle>
              </Col>
              <Col className="d-flex flex-row-reverse gap-2">
                <Button onClick={handleEditClick}>Edytuj</Button>
                <Dropdown as={ButtonGroup} style={{ width: "180px" }}>
                  <DropdownToggle variant={orderStatusColor[order.status]} className="w-100">
                    {orderStatusText[order.status]}
                  </DropdownToggle>
                  <DropdownMenu className="w-100">
                    {Object.keys(orderStatusText).map((status, index) => (
                      <DropdownItem onClick={() => handleStatusChange(status)} key={index} active={status === order.status}>{orderStatusText[status]}</DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>
                <Button variant="light" onClick={handleCopyClick} disabled={isCopied}>
                  {isCopied ? <FaCheck /> : <BiCopy />}
                </Button>
                <Button variant="light" onClick={handleDeleteClick} disabled={isCopied}>
                  {<FaMinus />}
                </Button>
              </Col>
            </Row>
          </Card.Header>
          <Card.Body className="d-flex gap-3">
            <div className="w-50">
              <Card.Text>
                <strong>VIN:</strong> {order.car.vin}
              </Card.Text>
              <Card.Text>
                <strong>Przebieg:</strong> {order.car.mileage} km
              </Card.Text>
              <Card.Text>
                <strong>Klient:</strong> {order.client.firstName} {order.client.lastName}
              </Card.Text>
              <Card.Text>
                <strong>Nr tel.:</strong> {order.client.phoneNumber}
              </Card.Text>
              <Card.Text>
                <strong>E-mail:</strong> {order.client.email}
              </Card.Text>
              <Card.Text>
                <strong>Koszt naprawy:</strong> {Number(order.partsCost).toFixed(2)} zł
              </Card.Text>
              <Card.Text>
                <strong>Zysk:</strong> {Number(order.profit).toFixed(2)} zł
              </Card.Text>
              <Card.Text>
                <strong>Całkowity koszt zamówienia:</strong> {Number(partsCost(order.parts) + parseFloat(order.profit)).toFixed(2)} zł
              </Card.Text>
              <Card.Text>
                <strong>Status:</strong> {orderStatusText[order.status]}
              </Card.Text>
              <Card.Text>
                <strong>Termin dostawy ostatniej części:</strong> {partsMaxDate(order.parts).toLocaleString("pl-PL", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit"
                })}
              </Card.Text>
            </div>
            <Card.Text className="w-50">
              <strong>Opis:</strong> {order.description}
            </Card.Text>
          </Card.Body>
          <Card.Header>
            <Card.Text><strong className="text-xl">Lista części</strong></Card.Text>
            {order.parts.map((part) => (
              <PartListItem
                key={part.id}
                part={part}
              />
            ))}
          </Card.Header>
          <AddPart order={order} />

        </Card>)}
    </>
  );
};

export default OrderDetails;
