import { db } from "../db.js";
import { updateEventValidation } from "../lib/validation.js";

export async function putEvent(req, res) {
    const { id, name, category, time, place } = req.body;

    const { error } = updateEventValidation({ id, name, category, place });
    if (error) return res.status(400).json({ status: 'error', message: error.details[0].message });

    const sql = `UPDATE event SET name = ?, category = ?, time = ?, place = ? WHERE id = ?`;
    try {
        const [result] = await db.execute(sql, [name, category, time, place, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ status: 'error', message: 'Toks renginis nerastas' });
        }
    } catch (error) {
        return res.status(500).json({ status: 'error', message: 'Serverio klaida' });
    }

    return res.status(200).json({ status: 'success', message: 'Renginis redaguotas sėkmingai' });
}