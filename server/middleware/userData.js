import { db } from "../db.js";

export async function userData(req, res, next) {
    req.user = {
        isLoggedIn: false,
    }

    if (!req.cookies.loginToken || req.cookies.loginToken.length !== 128) {
        return next();
    }

    try {
        const sql = `
            SELECT users.id, users.username, users.email, login_tokens.created_at AS login_tokens_created_at
            FROM login_tokens
            INNER JOIN users
                ON login_tokens.user_id = users.id
            WHERE token = ?;`;

        const [results] = await db.execute(sql, [req.cookies.loginToken]);

        if (results.length !== 1) {
            return next();
        }

        req.user = {
            ...results[0],
            isLoggedIn: true,
        };
    } catch (error) {
        console.log(error);
    }

    return next();
} 