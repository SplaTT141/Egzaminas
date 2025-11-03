import { db } from "../db.js";
import { newEventValidation } from "../lib/validation.js";

export async function postEvent(req, res) {
    const { name, category, time, place, image } = req.body;

    const { error } = newEventValidation({ name, category, place });
    if (error) return res.status(400).json({ status: 'error', message: error.details[0].message });

    try {
        const sql = `INSERT INTO event (name, category, time, place, img) VALUES (?, ?, ?, ?, ?)`;
        const [result] = await db.execute(sql, [name, category, time, place, image]);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 'error', message: 'Serverio klaida' });
    }

    return res.status(200).json({ status: 'success', message: 'Renginis pridėtas sėkmingai!' });
}
