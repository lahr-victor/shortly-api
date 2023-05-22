// VALUE IMPORTS
import db from '../database/database.connection.js';

// VALUE EXPORTS
export default async function authenticateSession(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace('Bearer ', '');
  if (!token) return res.sendStatus(401);

  try {
    const session = await db.query(`
    SELECT "userId" FROM sessions WHERE token = $1;
  `, [token]);
    if (!session.rows[0]) return res.sendStatus(401);
    res.locals.session = session.rows[0];

    return next();
  } catch (error) {
    return res.status(500).send(error.message);
  }
}
