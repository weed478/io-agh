'use client';

import { useSearchParams } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import { Badge } from "react-bootstrap";
import { getOrder, orderStatusText, orderStatusColor } from "@/model/order";


/*
  Simple page that displays order details.
  It uses URL query parameter to get order ID.
  Probably needs some styling (order progress bar).
  In future it should also allow to select car parts.
*/

function useFetchOrder() {
  const searchParams = useSearchParams();
  const [order, setOrder] = useState(null);
  // TODO: use firebase hooks
  const fetchOrder = useCallback(async orderId => {
    try {
      const result = await getOrder(orderId);
      setOrder(result);
    } catch (error) {
      console.error(error);
    }
  }, []);
  const orderId = searchParams.get("orderId");
  useEffect(() => {
    if (orderId) {
      fetchOrder(orderId);
    }
  }, [fetchOrder, orderId]);
  return order
}

const ClientOrderPage = () => {
  const order = useFetchOrder();

  return (
    <>
      {order ? (
        <Container className="mt-3">
          <Card>
            <Card.Header>
              <h2>Zlecenie {order.id}</h2>
            </Card.Header>
            <Card.Body>
              <Card.Text>
                <strong>VIN:</strong> {order.car.vin}
              </Card.Text>
              <Card.Text>
                <strong>Opis:</strong> {order.description}
              </Card.Text>
              <Card.Text>
                <strong>Przewidywana data ukończenia:</strong> {order.dueDate.toLocaleDateString("pl-PL", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                })}
              </Card.Text>
              <Card.Text>
                <strong>Status: </strong>
                <Badge variant={orderStatusColor[order.status]}>
                  {orderStatusText[order.status]}
                </Badge>
              </Card.Text>
            </Card.Body>
          </Card>
        </Container>
      ) : (
        <Container className="mt-3">
          <h2>Ładowanie...</h2>
        </Container>
      )}
    </>
  );
};

export default ClientOrderPage;