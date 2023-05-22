// PACKAGE IMPORTS
import { nanoid } from 'nanoid';

// VALUE IMPORTS
import db from '../database/database.connection.js';

// VALUE EXPORTS
export default async function shortenUrl(req, res) {
  const { session } = res.locals;
  const { url } = req.body;

  try {
    const shortenedUrl = nanoid(8);

    const result = await db.query(`
      INSERT INTO urls ("userId", url, "shortUrl") VALUES ($1, $2, $3) RETURNING id;
    `, [session.userId, url, shortenedUrl]);
    return res.status(201).send({ id: result.rows[0].id, shortUrl: shortenedUrl });
  } catch (error) {
    return res.status(500).send(error.message);
  }
}
