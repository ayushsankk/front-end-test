import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import './card-details.styles.scss';

import { Card } from '@mui/material';
import { Button } from '@mui/material';

const CardDetails = ({
  isSearching,
  element,
  deletehandler,
  setUserDetail,
  setPostDetail,
  ...otherProps
}) => {
  const { history } = { ...otherProps };
  const { title, body, userId, id } = { ...element };
  const [user, setUser] = useState({});

  useEffect(() => {
    fetchUserDataAsync();
  }, []);

  const handleClick = (e) => {
    e.stopPropagation();
    deletehandler(id);
  };

  const fetchUserDataAsync = async () => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${userId}`
      );
      const json = await response.json();
      setUser(json);
      
    } catch (ex) {
      console.log(ex);
    }
  };

  return (
    <Card
      variant="outlined"
      className="card-details"
      onClick={() => {
        element.userName = user.name;
        setPostDetail(element);
        history.push(`/post/${id}`);
      }}
    >
      <p className={`title ${isSearching ? 'highlighted' : 'not-highlighted'}`}>
        {' '}
        {title}{' '}
      </p>
      <p className="body"> {body.slice(0, 100)} </p>
      <div className="user-navigation">
        <p classname="posted-by"> Posted By: {user.Name} </p>
        <Link
          className="user-link"
          to={`/user/${userId}`}
          onClick={(e) => {
            e.stopPropagation();
            setUserDetail(user);
          }}
        >
          {user.name}
        </Link>
      </div>

      <Button variant="contained" onClick={handleClick}>
        Delete Post
      </Button>
    </Card>
  );
};

export default withRouter(CardDetails);
