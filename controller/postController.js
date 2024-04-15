import {pool} from '../db.js';

export async function createPost(req, res) {
    const {title, author, image_url, text} = req.body;
    try {
        const {rows: post} = await pool.query(
            'INSERT INTO posts (title, author, image_url, text) VALUES ($1, $2, $3, $4) RETURNING *;',
            [title, author, image_url, text]
        );
        res.json(post);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export async function getPosts(req, res) {
    try {
        const {rows: posts} = await pool.query('SELECT * FROM posts');
        res.json(posts);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export async function getPostWithId(req, res) {
    const {id} = req.params;
    try {
        const {rows: post} = await pool.query(
            'SELECT * FROM posts WHERE id= $1',
            [id]
        );
        res.json(post[0]);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export async function updatePost(req, res) {
  const {id} = req.params;
  const {title, author, url, text} = req.body;
  try {
      const {rows: order} = await pool.query(
          `UPDATE posts 
            SET title = $1,
            author = $2,
            image_url = $3,
            text = $4
           WHERE id = $5 RETURNING *`,
          [title, author, url, text, id]
      );
      res.json(order);
  } catch (error) {
      console.log(error);
      res.status(500);
  }
}

export async function deletePost(req, res) {
  const {id} = req.params;
  try {
      const {rows: order} = await pool.query(
          `SELECT * from posts WHERE id = $1`,
          [id]
      );
      if (!order.length > 0) {
          return res.send('Not found');
      }

      const {rows} = await pool.query(
          `DELETE FROM posts WHERE id = $1 RETURNING *`,
          [id]
      );
      res.json({message: 'post deleted', rows});
  } catch (error) {
      console.log(error);
      res.status(500);
  }
}
