import { Request, Response } from 'express';
import Size from '../models/size';



export const getSizes = async (req: Request, res: Response) => {
    const listSize = await Size.findAll()

    res.json(listSize)
}

export const getSize = async (req: Request, res: Response) => {
    const { id } = req.params;
    const size = await Size.findByPk(id);

    if (size) {
        res.json(size)
    } else {
        res.status(404).json({
            msg: `No existe tamaño con el id${id}`
        })
    }
}

export const deleteSize = async (req: Request, res: Response) => {
    const { id } = req.params;
    const size = await Size.findByPk(id);

    if (!size) {
        res.status(404).json({
            msg: `No existe un producto con el id ${id}`
        })
    } else {
        await Size.destroy();
        res.json({
            msg: 'El producto fue eliminado con exito!'
        })
    }

}

export const postSize = async (req: Request, res: Response) => {
    const { body } = req;

    try {
        await Size.create(body);

        res.json({
            msg: `El tamaño fue agregado con exito!`
        })
    } catch (error) {
        console.log(error);
        res.json({
            msg: `Upps ocurrio un error, comuniquese con soporte`
        })
    }
}

export const updateSize = async (req: Request, res: Response) => {
    const { body } = req;
    const { id } = req.params;

    try {

        const size = await Size.findByPk(id);

        if (size) {
            await size.update(body);
            res.json({
                msg: 'El Tamaño fue actualizado con exito'
            })

        } else {
            res.status(404).json({
                msg: `No existe el tamaño con el id ${id}`
            })
        }

    } catch (error) {
        console.log(error);
        res.json({
            msg: `Upps ocurrio un error, comuniquese con soporte`
        })
    }


}



