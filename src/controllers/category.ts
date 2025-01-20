import { Request, Response } from 'express';
import Category from '../models/categories';



export const getCategories = async (req: Request, res: Response) => {
    const listCategories= await Category.findAll()

    res.json(listCategories)
}

export const getCategory = async (req: Request, res: Response) => {
    const { id } = req.params;
    const category = await Category.findByPk(id);

    if (category) {
        res.json(category)
    } else {
        res.status(404).json({
            msg: `No existe categoría con el id${id}`
        })
    }
}

export const deleteCategory = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const brand = await Category.findByPk(id);

        if (!brand) {
            return res.status(404).json({
                msg: `No existe una marca con el id ${id}`
            });
        }
        await Category.destroy({
            where: { id: id }
        });

        res.json({
            msg: 'La Categoría fue eliminada con éxito!'
        });
        
    } catch (error) {
        res.status(500).json({
            msg: 'Error al eliminar la Categoría',
            error
        });
    }
}

export const postCategory = async (req: Request, res: Response) => {
    const { body } = req;

    try {
        await Category.create(body);

        res.json({
            msg: `La categoría fue agregada con exito!`
        })
    } catch (error) {
        console.log(error);
        res.json({
            msg: `Upps ocurrio un error, comuniquese con soporte`
        })
    }
}

export const updateCategory = async (req: Request, res: Response) => {
    const { body } = req;
    const { id } = req.params;

    try {

        const category = await Category.findByPk(id);

        if (category) {
            await category.update(body);
            res.json({
                msg: 'La Categoría fue actualizado con exito'
            })

        } else {
            res.status(404).json({
                msg: `No existe la categoría con el id ${id}`
            })
        }

    } catch (error) {
        console.log(error);
        res.json({
            msg: `Upps ocurrio un error, comuniquese con soporte`
        })
    }


}



