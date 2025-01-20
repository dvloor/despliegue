import { Request, Response } from 'express';
import Brand from '../models/brands';



export const getBrands = async (req: Request, res: Response) => {
    const listBrands = await Brand.findAll()

    res.json(listBrands)
}

export const getBrand = async (req: Request, res: Response) => {
    const { id } = req.params;
    const brand = await Brand.findByPk(id);

    if (brand) {
        res.json(brand)
    } else {
        res.status(404).json({
            msg: `No existe un producto con el id${id}`
        })
    }
}

export const deleteBrand = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const brand = await Brand.findByPk(id);

        if (!brand) {
            return res.status(404).json({
                msg: `No existe una marca con el id ${id}`
            });
        }
        await Brand.destroy({
            where: { id: id }
        });

        res.json({
            msg: 'La marca fue eliminada con éxito!'
        });
        
    } catch (error) {
        res.status(500).json({
            msg: 'Error al eliminar la marca',
            error
        });
    }
}

export const postBrand = async (req: Request, res: Response) => {
    const { body } = req;

    try {
        await Brand.create(body);

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

export const updateBrand = async (req: Request, res: Response) => {
    const { body } = req;
    const { id } = req.params;

    try {

        const brand = await Brand.findByPk(id);

        if (brand) {
            await brand.update(body);
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



