import {Router} from 'express';
import {
    createPost,
    getPostWithId,
    getPosts,
    updatePost,
    deletePost
} from '../controller/postController.js';

export const postRouter = Router();

postRouter
  .route('/')
  .get(getPosts)
  .post(createPost)
  ;

postRouter
  .route('/:id')
  .get(getPostWithId)
  .put(updatePost)
  .delete(deletePost);
