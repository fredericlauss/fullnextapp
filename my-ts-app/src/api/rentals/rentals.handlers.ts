import { NextFunction, Request, Response } from "express";
import { Rental, RentalWithId, Rentals } from "./rentals.model";
import { Item, ItemWithId, Items } from "../items/items.model";
import { ParamsWithId } from "../../interfaces/ParamsWithId";
import { ObjectId } from "mongodb";
import {sendEmail } from "../__helper__/email"

export async function findAll(req: Request, res: Response<RentalWithId[]>, next: NextFunction) {
    try {
        const items = await Rentals.find().exec();
        res.json(items);
    } catch (error) {
        next(error)
    }
}


export async function creatOne(req: Request<{}, RentalWithId, Rental>, res: Response<RentalWithId>, next: NextFunction) {
    try {
        const item = await Items.findOne({
            _id: new ObjectId(req.body.itemId),
        });
        if (!item) {
            res.status(404);
            throw new Error(`Item with id "${req.body.itemId}" not found`)
        }
        if (item.isRented === true) {
            res.status(400);
            throw new Error(`item with ID ${req.body.itemId} already rented`);
        }

        if (item.rentalId) {
            res.status(400);
            throw new Error(`item with ID ${req.body.itemId} has already an renting ID`);
        }

        const newRentalData = { ...req.body };
        const newRental = new Rentals(newRentalData);
        const savedRental = await newRental.save();

        await Items.findByIdAndUpdate(req.body.itemId, { isRented: true, rentalId: savedRental._id });

        const emailSubject = 'Nouvelle location créée';
        const emailText = `Vous avez créé une nouvelle location pour l'item "${item.name}" du ${savedRental.startDate} au ${savedRental.endDate}`;
        await sendEmail(savedRental.studentEmail, emailSubject, emailText);

        res.status(201).json(savedRental);
    } catch (error) {
        next(error);
    }
}

export async function findOne(req: Request<ParamsWithId, RentalWithId, []>, res: Response<RentalWithId>, next: NextFunction) {
    try {
        const result = await Rentals.findOne({
            _id: new ObjectId(req.params.id),
        });
        if (!result) {
            res.status(404);
            throw new Error(`Item with id "${req.params.id}" not found`)
        }
        res.json(result);
    } catch (error) {
        next(error);
    }
}

export  async function deleteOne(req: Request<ParamsWithId, {}, {}>, res: Response<{}>, next: NextFunction) {
    try {
        const rentalId = new ObjectId(req.params.id);
        const rentalToDelete = await Rentals.findOne({ _id: rentalId });

        if (!rentalToDelete) {
            res.status(404);
            throw new Error(`Rental with id "${req.params.id}" not found`);
        }

        await Items.findByIdAndUpdate(rentalToDelete.itemId, { isRented: false, rentalId: null });

        const result = await Rentals.findOneAndDelete({ _id: rentalId });

        if (!result) {
            res.status(404);
            throw new Error(`Rental with id "${req.params.id}" not found`);
        }

        res.status(204).end();
    } catch (error) {
        next(error);
    }
}

export  async function reminder(req: Request<ParamsWithId, {}, {}>, res: Response<{}>, next: NextFunction) {
    try {
        const rentalId = req.params.id;
        const rental = await Rentals.findById(rentalId);
        const item = await Items.findById(rental?.itemId);

      if (!rental) {
        res.status(404);
        throw new Error(`Rental with id "${rentalId}" not found`);
      }

      if (!item) {
        res.status(404);
        throw new Error(`Item with id "${rental?.itemId}" not found`);
      }
      const emailSubject = 'Rappel pour votre item';
      const emailText = `N'oubliez pas votre item "${item.name}" le ${rental.endDate}`;

      // Envoyez l'e-mail
      await sendEmail(rental.studentEmail, emailSubject, emailText);

      res.status(200).json({ message: 'Reminder sent successfully' });
    } catch (error) {
        next(error);
    }
}