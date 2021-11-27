import React, { useState, useEffect } from 'react';
import Comment from '../comments/comment.component';

import { FormControl, Input, InputLabel, FormHelperText, Button } from '@mui/material';

import './post-detail.styles.scss';

const PostDetail = ({ postDetail }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({
    commentTitle: '',
    email: '',
    body: '',
  });

  const { commentTitle, email, body } = newComment;

  useEffect(() => {
    fetchCommentDataAsync();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setNewComment({ ...newComment, [name]: value });
  };

  const deleteComment = (id) => {
    const newComments = comments.filter((element) => element.id !== id);
    setComments(newComments);
  };

  const fetchCommentDataAsync = () => {
    try {
      console.log('fetch');
      fetch(
        `https://jsonplaceholder.typicode.com/posts/${postDetail.id}/comments`
      )
        .then((response) => response.json())
        .then((data) => setComments(data));
    } catch (ex) {
      console.log(ex);
    }
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    var newComment = {
      postId: comments[0].postId,
      id: comments[comments.length - 1].id + 1,
      name: commentTitle,
      email: email,
      body: body,
    };

    setComments([newComment, ...comments]);
  };

  return (
    <div className="post-detail">
      <p className="post-title">{postDetail.title}</p>
      <p className="post-user">Posted By: {postDetail.userName}</p>
      <div className="body-form">
      <p className="post-body">{postDetail.body}</p>
      <form className="comment-form" onSubmit={onSubmitHandler}>
        <FormControl className="form-input">
          <InputLabel htmlFor="my-name">Name</InputLabel>
          <Input required id="my-name" name="commentTitle" value={commentTitle} onChange={handleChange} />
        </FormControl>
        <FormControl className="form-input">
          <InputLabel htmlFor="my-email">Email address</InputLabel>
          <Input required id="my-email" aria-describedby="my-helper-text" name="email" value={email} onChange={handleChange} />
          <FormHelperText id="my-helper-text">
            We'll never share your email.
          </FormHelperText>
        </FormControl >
        <FormControl className="form-input">
          <InputLabel htmlFor="my-body">Body</InputLabel>
          <Input required id="my-body" name="body" value={body} onChange={handleChange} />
        </FormControl>
        <Button className="submit-button" variant="outlined" type="submit">Add new Comment</Button>
      </form>
      </div>
      <div className="comment-list">
      {comments.map((element) => (
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
