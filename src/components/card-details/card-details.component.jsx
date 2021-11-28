import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import './card-details.styles.scss';

import { fetchData
 } from '../../utils';
import { Card } from '@mui/material';
import { Button } from '@mui/material';

import Highlighter from 'react-highlight-words';

const CardDetails = ({
  searchField,
  element,
  deletehandler,
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
    const userData = await fetchData(
      `https://jsonplaceholder.typicode.com/users/${userId}`
    );
    setUser(userData);
  };

  return (
    <Card
      variant="outlined"
      className="card-details"
      onClick={() => {
        history.push(`/post/${id}`);
      }}
    >
      <Highlighter
        className="title"
        highlightClassName="highlighted"
        searchWords={[searchField]}
        autoEscape={true}
        textToHighlight={title}
      />
      <p className="body"> {body.slice(0, 100)} </p>
      <div className="user-navigation">
        <p className="posted-by"> Posted By: </p>
        <Link
          className="user-link"
          to={`/user/${userId}`}
          onClick={(e) => {
            e.stopPropagation();
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
