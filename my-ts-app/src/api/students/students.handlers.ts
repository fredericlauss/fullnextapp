import { NextFunction, Request, Response } from "express";


export type Student = {
    id: number;
    nom?: string;
    prenom?: string;
    mail?: string;
};

export async function findAll(req: Request, res: Response, next: NextFunction) {
    try {
        const url: string = 'http://vps-a47222b1.vps.ovh.net:4242/student';
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            res.json(data);
        } else {
            res.status(404);
            throw new Error(`Students not found`)
        }
    } catch (error) {
        next(error);
    }
}
