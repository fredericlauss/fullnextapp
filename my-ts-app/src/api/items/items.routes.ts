import { Router, Request, Response } from "express";
import { ItemWithId, Items } from "./itmes.model";

const router = Router();

router.get('/', async (req: Request, res: Response<ItemWithId[]>) => {
    const result = await Items.find();
    const items = await result.toArray();
    res.json(items);
});

export default router;