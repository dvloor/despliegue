import { Request, Response } from 'express';
import Admin from '../models/admins';



export const getAdmins = async (req: Request, res: Response) => {
    const listAdmins = await Admin.findAll()

    res.json(listAdmins)
}

export const getAdmin = async (req: Request, res: Response) => {
    const { id } = req.params;
    const admin = await Admin.findByPk(id);

    if (admin) {
        res.json(admin)
    } else {
        res.status(404).json({
            msg: `No existe Administrador con el id${id}`
        })
    }
}

export const deleteAdmin = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const admin = await Admin.findByPk(id);

        if (!admin) {
            return res.status(404).json({
                msg: `No existe una marca con el id ${id}`
            });
        }
        await Admin.destroy({
            where: { id: id }
        });

        res.json({
            msg: 'Admin fue eliminado con éxito!'
        });
        
    } catch (error) {
        res.status(500).json({
            msg: 'Error al eliminar Admin',
            error
        });
    }
}

export const postAdmin = async (req: Request, res: Response) => {
    const { body } = req;

    try {
        await Admin.create(body);

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

export const updateAdmin = async (req: Request, res: Response) => {
    const { body } = req;
    const { id } = req.params;

    try {

        const admin = await Admin.findByPk(id);

        if (admin) {
            await admin.update(body);
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



