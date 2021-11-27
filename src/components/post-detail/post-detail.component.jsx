import React, { useState, useEffect } from 'react';
import Comment from '../comments/comment.component';

import {
  FormControl,
  Input,
  InputLabel,
  FormHelperText,
  Button,
} from '@mui/material';

import './post-detail.styles.scss';

import { fetchData } from '../../utils';

const PostDetail = ({ match }) => {
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [user, setUser] = useState('');
  const [newComment, setNewComment] = useState({
    commentTitle: '',
    email: '',
    body: '',
  });

  const { commentTitle, email, body } = newComment;

  useEffect(async () => {
    const userId = await fetchPostDataAsync();
    await fetchUserDataAsync(userId);
    await fetchCommentDataAsync();
  }, []);

  const fetchUserDataAsync = async (userId) => {
    const userData = await fetchData(
      `https://jsonplaceholder.typicode.com/users/${userId}`
    );

    setUser(userData.name)
  };

  const fetchPostDataAsync = async () => {
    const jsonData = await fetchData(
      'https://jsonplaceholder.typicode.com/posts'
    );
    const postData = jsonData.filter(
      (element) => element.id == match.params.postId
    )[0];
    setPost(postData);
    return postData.userId
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setNewComment({ ...newComment, [name]: value });
  };

  const deleteComment = (id) => {
    const newComments = comments.filter((element) => element.id !== id);
    setComments(newComments);
  };

  const fetchCommentDataAsync = async () => {
    const commentData = await fetchData(
      `https://jsonplaceholder.typicode.com/posts/${match.params.postId}/comments`
    );
    setComments(commentData);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    var newComment = {
      postId: comments[0].postId,
      id: comments[0].id + 1,
      name: commentTitle,
      email: email,
      body: body,
    };

    setComments([newComment, ...comments]);
  };

  return (
    <div className="post-detail">
      <p className="post-title">{post.title}</p>
      <p className="post-user">Posted By: {user}</p>
      <div className="body-form">
        <p className="post-body">{post.body}</p>
        <form className="comment-form" onSubmit={onSubmitHandler}>
          <FormControl className="form-input">
            <InputLabel htmlFor="my-name">Name</InputLabel>
            <Input
              required
              id="my-name"
              name="commentTitle"
              value={commentTitle}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl className="form-input">
            <InputLabel htmlFor="my-email">Email address</InputLabel>
            <Input
              required
              id="my-email"
              aria-describedby="my-helper-text"
              name="email"
              value={email}
              onChange={handleChange}
            />
            <FormHelperText id="my-helper-text">
              We'll never share your email.
            </FormHelperText>
          </FormControl>
          <FormControl className="form-input">
            <InputLabel htmlFor="my-body">Body</InputLabel>
            <Input
              required
              id="my-body"
              name="body"
              value={body}
              onChange={handleChange}
            />
          </FormControl>
          <Button className="submit-button" variant="outlined" type="submit">
            Add new Comment
          </Button>
        </form>
      </div>
      <div className="comment-list">
        {comments
          .sort(function (a, b) {
            return b.id - a.id;
          })
          .map((element) => (
            <Comment key={element.id} comment={element}>
              {' '}
              deleteComment={deleteComment}
            </Comment>
          ))}
      </div>
    </div>
  );
};

export default PostDetail;
