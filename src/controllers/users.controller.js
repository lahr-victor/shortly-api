// PACKAGE IMPORTS
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

// VALUE IMPORTS
import db from '../database/database.connection.js';

// VALUE EXPORTS
export async function signUp(req, res) {
  const {
    name,
    email,
    password,
    confirmPassword,
  } = req.body;

  try {
    const users = await db.query(`
    SELECT email FROM users;
  `);
    if (users.rows.find((user) => (user.email === email))) {
      return res.status(409).send('This e-mail address is already in use!');
    }

    if (password !== confirmPassword) return res.status(422).send('The passwords do not match!');

    const hash = bcrypt.hashSync(password, 10);

    await db.query(`
      INSERT INTO users (name, email, password) VALUES ($1, $2, $3);
    `, [name, email, hash]);
    return res.sendStatus(201);
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

export async function signIn(req, res) {
  const {
    email,
    password,
  } = req.body;

  try {
    const users = await db.query(`
    SELECT email FROM users;
  `);
    if (!users.rows.find((user) => (user.email === email))) {
      return res.status(401).send('This e-mail address is not registered!');
    }

    const user = await db.query(`
    SELECT id, password FROM users WHERE email = $1;
  `, [email]);

    const correctPassword = bcrypt.compareSync(password, user.rows[0].password);
    if (!correctPassword) return res.status(401).send('Password is incorrect! Please try again.');

    const token = uuid();

    await db.query(`
      INSERT INTO sessions ("userId", token) VALUES ($1, $2);
    `, [user.rows[0].id, token]);
    return res.status(200).send({ token });
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

export async function retrieveUserById(req, res) {
  const { session } = res.locals;

  try {
    const user = await db.query(`
      SELECT users.id, users.name, SUM(urls."visitCount") AS "visitCount" FROM users
        JOIN urls ON users.id = urls."userId" WHERE users.id = $1 GROUP BY users.id;
    `, [session.userId]);

    const shortenedUrls = await db.query(`
      SELECT id, "shortUrl", url, "visitCount" FROM urls WHERE "userId" = $1 ORDER BY id;
    `, [session.userId]);

    if (!user.rows[0] || !shortenedUrls.rows[0]) return res.sendStatus(404);

    return res.status(200).send({ ...user.rows[0], shortenedUrls: shortenedUrls.rows });
  } catch (error) {
    return res.status(500).send(error.message);
  }
}
