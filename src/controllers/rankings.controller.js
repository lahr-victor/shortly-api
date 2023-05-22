// VALUE IMPORTS
import db from '../database/database.connection.js';

// VALUE EXPORTS
export default async function retrieveRanking(req, res) {
  try {
    const ranking = await db.query(`
    SELECT users.id, users.name, COUNT(urls.*) AS "linksCount", SUM(urls."visitCount") AS "visitCount" FROM users
      JOIN urls ON users.id = urls."userId" GROUP BY users.id ORDER BY "visitCount" DESC LIMIT 10;
    `);

    if (!ranking.rows[0]) return res.sendStatus(404);

    return res.status(200).send(ranking.rows);
  } catch (error) {
    return res.status(500).send(error.message);
  }
}
