import { Request, Response } from 'express';
import Order from '../models/orders';
import Customer from '../models/customers';
import OrderDetail from '../models/order_details';
import Product from '../models/products';

export const getOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.findAll({
      include: [
        {
          model: OrderDetail,
          as: 'order_details',
          include: [
            {
              model: Product,
              as: 'product',
              attributes: ['id', 'name', 'price', 'discount_price', 'stock'],
            },
          ],
        },
        {
          model: Customer,
          as: 'customer',
          attributes: ['id', 'name', 'lastname', 'email', 'phone'],
        },
      ],
    });

    const formattedOrders = orders.map((order: any) => ({
      id: order.id,
      customer_id: order.customer_id,
      customer_name: order.customer.name,
      customer_lastname: order.customer.lastname,
      customer_email: order.customer.email,
      customer_phone: order.customer.phone,
      order_date: order.order_date,
      status: order.status,
      total_price: order.total_price,
      products: order.order_details.map((orderDetail: any) => ({
        product_id: orderDetail.product.id,
        product_name: orderDetail.product.name,
        unit_price: orderDetail.product.price,
        discount_price: orderDetail.product.discount_price,
        quantity: orderDetail.quantity,
        total_price: orderDetail.quantity * orderDetail.product.price,
      })),
    }));

    res.json(formattedOrders);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Error al recuperar las órdenes',
      error: (error as Error).message,
    });
  }
};
