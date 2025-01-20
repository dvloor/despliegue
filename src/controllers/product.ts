import { Request, Response } from 'express';
import Producto from '../models/products';
import Brand from '../models/brands';
import Size from '../models/size';
import Category from '../models/categories';
import Product from '../models/products';



export const getProducts = async (req: Request, res: Response) => {
    const listProducts = await Producto.findAll({
        include: [
            { model: Brand, as: 'brand', attributes: ['name'] },
            { model: Size, as: 'size', attributes: ['size'] },
            { model: Category, as: 'category', attributes: ['name'] },]
    })

    res.json(listProducts)
}

export const getProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    const product = await Producto.findByPk(id);

    if (product) {
        res.json(product)
    } else {
        res.status(404).json({
            msg: `No existe un producto con el id ${id}`
        })
    }
}

export const deleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    const product = await Producto.findByPk(id);

    if (!product) {
        res.status(404).json({
            msg: `No existe un producto con el id ${id}`
        })
    } else {
        await product.destroy();
        res.json({
            msg: 'El producto fue eliminado con exito!'
        })
    }

}

export const postProduct = async (req: Request, res: Response) => {
    const { body } = req;

    try {
        await Producto.create(body);

        res.json({
            msg: `El producto fue agregado con exito!`
        })
    } catch (error) {
        console.log(error);
        res.json({
            msg: `Upps ocurrio un error, comuniquese con soporte`
        })
    }
}

export const updateProduct = async (req: Request, res: Response) => {
    const { body } = req;
    const { id } = req.params;

    try {

        const product = await Producto.findByPk(id);

        if (product) {
            await product.update(body);
            res.json({
                msg: 'El producto fue actualizado con exito'
            })

        } else {
            res.status(404).json({
                msg: `No existe un producto con el id ${id}`
            })
        }

    } catch (error) {
        console.log(error);
        res.json({
            msg: `Upps ocurrio un error, comuniquese con soporte`
        })
    }

}

export const getProductCount = async (req: Request, res: Response) => {
    try {
        // Consulta count para obtener el número total de productos
        const count = await Producto.count();
        res.json({ count });  // Devuelve solo el conteo, no los productos completos
    } catch (error) {
        res.status(500).json({ msg: 'Error al contar productos', error });
    }
};