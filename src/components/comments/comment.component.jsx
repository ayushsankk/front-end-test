import React from 'react';
import { Card, Button } from '@mui/material';

import './comment.styles.scss';

const Comment = ({ comment, ...otherProps }) => {
  const handleClick = (e) => {
    otherProps.children[2](comment.id);
  };

  return (
    <Card variant="outlined" className="comment-detail">
      <p className="comment-name">{comment.name}</p>
      <p className="comment-body">{comment.body}</p>
      <p>
        Commented By: <span>{comment.email}</span>
      </p>
      <Button className="delete-comment" variant="contained" onClick={handleClick}>Delete Comment</Button>
    </Card>
  );
};

export default Comment;
