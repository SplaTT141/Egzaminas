import { db } from "../db.js";

export async function getEvents(req, res) {
    try {
        const sql = `SELECT id, name, category, time, place, img FROM event`
        const [events] = await db.execute(sql);

        return res.status(200).json({ status: 'success', events });
    } catch (error) {
        return res.status(500).json({ status: 'error', message: 'Serverio klaida' });
    }
}