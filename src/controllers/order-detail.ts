import { Request, Response } from 'express';
import OrderDetail from '../models/order_details';
import Product  from '../models/products';
import Order from '../models/orders';
import Customer from '../models/customers';



export const getOrderDetails = async (req: Request, res: Response) => {
    const listOrders = await OrderDetail.findAll({
        include: [
            { model: Order, as: 'order', attributes: ['id', 'order_date', 'total_price','status'], 
              include: [{ model: Customer, as: 'customer', attributes: ['name', 'lastname'] }] 
            },
            { model: Product, as: 'product', attributes: ['name','description','price','discount_price','stock'] }
        ]
    })

    res.json(listOrders)
}

export const getOrderDetail = async (req: Request, res: Response) => {
    const { id } = req.params;
    const order_detail = await OrderDetail.findByPk(id);

    if (order_detail) {
        res.json(order_detail)
    } else {
        res.status(404).json({
            msg: `No existe un orden con el id ${id}`
        })
    }
}

export const deleteOrderDetail = async (req: Request, res: Response) => {
    const { id } = req.params;
    const order_detail = await OrderDetail.findByPk(id);

    if (!order_detail) {
        res.status(404).json({
            msg: `No existe un orden con el id ${id}`
        })
    } else {
        await order_detail.destroy();
        res.json({
            msg: 'El orden fue eliminado con exito!'
        })
    }

}

export const postOrderDetail = async (req: Request, res: Response) => {
    const { body } = req;

    try {
        await OrderDetail.create(body);

        res.json({
            msg: `El orden fue agregado con exito!`
        })
    } catch (error) {
        console.log(error);
        res.json({
            msg: `Upps ocurrio un error, comuniquese con soporte`
        })
    }
}

export const updateOrderDetail = async (req: Request, res: Response) => {
    const { body } = req;
    const { id } = req.params;

    try {

        const order_detail = await OrderDetail.findByPk(id);

        if (order_detail) {
            await order_detail.update(body);
            res.json({
                msg: 'El orden fue actualizado con exito'
            })

        } else {
            res.status(404).json({
                msg: `No existe un orden con el id ${id}`
            })
        }

    } catch (error) {
        console.log(error);
        res.json({
            msg: `Upps ocurrio un error, comuniquese con soporte`
        })
    }


}



