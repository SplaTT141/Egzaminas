import { db } from "../db.js";

export function putHeart(req, res) {
    const { id } = req.body;

    const sql = `UPDATE event SET rating = rating + 1 WHERE id = ?`;
    try {
        const [result] = db.execute(sql, [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ status: 'error', message: 'Toks renginis nerastas' });
        }
    } catch (error) {
        return res.status(500).json({ status: 'error', message: 'Serverio klaida' });
    }


}