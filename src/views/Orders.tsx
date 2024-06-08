import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { deleteOrder, getOrders } from '../services/data';
import { Order } from '../types/types';

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);

  const handleDelete =  async (id: number) => {
    const deleteOrderResponse = await deleteOrder(id)
    if(deleteOrderResponse){
      alert('Sucessful deleted')
      setOrders(orders.filter(order=> order.id !== id))
    }else{
      alert('We couldn\'t delete the order')
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      const ordersData = await getOrders();
      setOrders(ordersData);
    };
    fetchOrders();
  }, []);

  return (
    <div>
      <h1>My orders</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Order&nbsp;#</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>#&nbsp;Products</TableCell>
              <TableCell>Final Price</TableCell>
              <TableCell>Options</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow
                key={order.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {order.id}
                </TableCell>
                <TableCell>{order.orderNo}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>{order.productsNo}</TableCell>
                <TableCell>{order.finalPrice.toFixed(2)}</TableCell>
                <TableCell sx={{ display: 'flex', gap: '.5rem' }}>
                  <Button
                    component={Link}
                    to={`/add-order/${order.id}`}
                    variant="outlined"
                    size="small"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={() => handleDelete(order.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
