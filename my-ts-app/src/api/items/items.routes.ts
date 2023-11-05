import { Router, Request, Response } from "express";
import Item from "./itmes.model";

const router = Router();

router.get('/', (req: Request, res: Response<Item[]>) => {
    res.json([{
        name: 'first item',
    }]);
});

export default router;