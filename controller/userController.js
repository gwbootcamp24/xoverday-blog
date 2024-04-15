import { pool } from '../db.js';

export async function getUsers(req, res) {
  console.log("res")

  try {
      const { rows: users } = await pool.query('SELECT * FROM users');
      console.log("res")
      res.json(users);
  } catch (error) {
      console.log(error);
      res.sendStatus(500);
  }
}

export async function getUserWithId(req, res) {
  const { id } = req.params;
  try {
      const { rows: user } = await pool.query(
          'SELECT * FROM Users WHERE id = $1',
          [id]
      );
      res.json(user[0]);
  } catch (error) {
      console.log(error);
      res.sendStatus(500);
  }
}
