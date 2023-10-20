import express from 'express'
import Item from '../models/item'

const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const todos = await Item.find()
        res.status(200).json(todos)
    }
    catch (err) {
        res.status(500).json({ message: "err.message" })
    }
});