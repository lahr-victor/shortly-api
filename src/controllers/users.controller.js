// PACKAGE IMPORTS
import bcrypt from 'bcrypt';

// VALUE IMPORTS
import db from '../database/database.connection.js';

// VALUE EXPORTS
export default async function signUp(req, res) {
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
      INSERT INTO users (name, email, password, createdAt) VALUES ($1, $2, $3, $4);
    `, [name, email, hash, new Date().toISOString()]);
    return res.sendStatus(201);
  } catch (error) {
    return res.status(500).send(error.message);
  }
}
