// PACKAGE IMPORTS
import { nanoid } from 'nanoid';

// VALUE IMPORTS
import db from '../database/database.connection.js';

// VALUE EXPORTS
export async function shortenUrl(req, res) {
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

export async function retrieveUrlById(req, res) {
  const id = parseInt(req.params.id, 10);
  if (id.isNaN) return res.sendStatus(400);

  try {
    const url = await db.query(`
      SELECT id, "shortUrl", url FROM urls WHERE id = $1;
    `, [id]);

    if (!url.rows[0]) return res.sendStatus(404);

    return res.status(200).send(url.rows[0]);
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

export async function redirectUrl(req, res) {
  const { shortUrl } = req.params;

  try {
    const url = await db.query(`
      SELECT url FROM urls WHERE "shortUrl" = $1;
    `, [shortUrl]);

    if (!url.rows[0]) return res.sendStatus(404);

    await db.query(`
      UPDATE urls SET "visitCount" = ("visitCount" + 1) WHERE "shortUrl" = $1;
    `, [shortUrl]);

    return res.redirect(url.rows[0].url);
  } catch (error) {
    return res.status(500).send(error.message);
  }
}