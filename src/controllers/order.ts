import { Request, Response } from 'express';
import Order from '../models/orders';
import Customer from '../models/customers';



export const getOrders = async (req: Request, res: Response) => {
    const listOrders = await Order.findAll({
        include: [
            { model: Customer, as: 'customer', attributes: ['name','lastname'] }]
    })

    res.json(listOrders)
}

export const getOrder = async (req: Request, res: Response) => {
    const { id } = req.params;
    const order = await Order.findByPk(id);

    if (order) {
        res.json(order)
    } else {
        res.status(404).json({
            msg: `No existe un orden con el id ${id}`
        })
    }
}

export const deleteOrder = async (req: Request, res: Response) => {
    const { id } = req.params;
    const order = await Order.findByPk(id);

    if (!order) {
        res.status(404).json({
            msg: `No existe un orden con el id ${id}`
        })
    } else {
        await order.destroy();
        res.json({
            msg: 'El orden fue eliminado con exito!'
        })
    }

}

export const postOrder = async (req: Request, res: Response) => {
    const { body } = req;

    try {
        await Order.create(body);

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

export const updateOrder = async (req: Request, res: Response) => {
    const { body } = req;
    const { id } = req.params;

    try {

        const order = await Order.findByPk(id);

        if (order) {
            await order.update(body);
            res.json({
                msg: 'La orden fue actualizado con exito'
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



