'use client';

import { useState, useCallback } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { motion } from "framer-motion";
import { useSignOut } from "react-firebase-hooks/auth";
import { useGetOrders } from "@/model/order";
import { auth } from "@/logic/fb";
import { useUserEmail } from "@/logic/auth";
import ProtectedRoute from "@/components/ProtectedRoute";
import OrderListItem from "./OrderListItem";
import OrderDetails from "./OrderDetails";
import AddOrder from "./AddOrder";


const MechanicHomePage = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [addOrderVisible, setAddOrderVisible] = useState(false);

  const handleSelectOrder = useCallback((order) => {
    setSelectedOrder(order);
    setAddOrderVisible(false);
  }, []);

  const handleAddOrder = useCallback(() => {
    setSelectedOrder(null);
    setAddOrderVisible(true);
  }, []);

  const [signOut, ,] = useSignOut(auth);

  const orders = useGetOrders().sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime());

  const email = useUserEmail();

  function deselectOrder() {
    setSelectedOrder(null);
  }

  return (
    <>
      <Navbar className="sticky-top" style={{top: "0", height: "6rem"}} bg="primary">
        <Container>
          <Button onClick={handleAddOrder}>Dodaj zamówienie</Button>
          <Navbar.Brand className="text-white fw-bolder fs-3">IO IO IO</Navbar.Brand>
          <div className="d-flex flex-row align-items-baseline">
            <Navbar.Text className="text-white me-3">{email}</Navbar.Text>
            <Button onClick={signOut}>Wyloguj</Button>
          </div>
        </Container>
      </Navbar>
      <Container fluid className="mt-3">
        <Row>
          <Col xs="7" >
             {orders.map((order, index) => (
               <motion.div
                 key={order.id}
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0, transition: { delay: index * 0.05 } }}
                 transition={{ duration: 0.2 }}
               >
                 <OrderListItem
                   order={order}
                   onClick={() => handleSelectOrder(order)}
                 />
               </motion.div>
             ))}
           </Col>
          <Col>
            <div className="sticky-top" style={{ top: "calc(6rem + 16px)" }}>
              {selectedOrder && <OrderDetails order={selectedOrder} deselectOrder={deselectOrder} />}
              {addOrderVisible && <AddOrder />}
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

const MechanicHomePageProtected = () => {
  return (
    <ProtectedRoute permissionLevel="MECHANIC">
      <MechanicHomePage />
    </ProtectedRoute>
  );
};

export default MechanicHomePageProtected;
