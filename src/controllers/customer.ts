import { Request, Response } from 'express';
import Customer from '../models/customers';



export const getCustomers = async (req: Request, res: Response) => {
    const listCustomers = await Customer.findAll()

    res.json(listCustomers)
}

export const getCustomer = async (req: Request, res: Response) => {
    const { id } = req.params;
    const customer = await Customer.findByPk(id);

    if (customer) {
        res.json(customer)
    } else {
        res.status(404).json({
            msg: `No existe un producto con el id${id}`
        })
    }
}

export const deleteCustomer = async (req: Request, res: Response) => {
    const { id } = req.params;
    const customer = await Customer.findByPk(id);

    if (!customer) {
        res.status(404).json({
            msg: `No existe un producto con el id ${id}`
        })
    } else {
        await Customer.destroy();
        res.json({
            msg: 'El producto fue eliminado con exito!'
        })
    }

}

export const postCustomer = async (req: Request, res: Response) => {
    const { body } = req;

    try {
        await Customer.create(body);

        res.json({
            msg: `La marca fue agregada con exito!`
        })
    } catch (error) {
        console.log(error);
        res.json({
            msg: `Upps ocurrio un error, comuniquese con soporte`
        })
    }
}

export const updateCustomer = async (req: Request, res: Response) => {
    const { body } = req;
    const { id } = req.params;

    try {

        const customer = await Customer.findByPk(id);

        if (customer) {
            await customer.update(body);
            res.json({
                msg: 'La Marca fue actualizado con exito'
            })

        } else {
            res.status(404).json({
                msg: `No existe la marca con el id ${id}`
            })
        }

    } catch (error) {
        console.log(error);
        res.json({
            msg: `Upps ocurrio un error, comuniquese con soporte`
        })
    }


}



