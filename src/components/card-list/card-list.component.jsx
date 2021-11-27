import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import { TextField } from '@mui/material';

import './card-list.styles.scss';
import CardDetails from '../card-details/card-details.component';

const CardList = () => {
  const [posts, setPosts] = useState([]);
  const [displayPosts, setDisplayPosts] = useState([]);
  const [counter, setCounter] = useState(1);
  const [hasMore, sethasMore] = useState(true);
  const [searchField, setSearchField] = useState('');

  useEffect(() => {
    fetchPostDataAsync();
  }, []);

  const deletehandler = (id) => {
    const newposts = displayPosts.filter((element) => element.id !== id);
    setDisplayPosts(newposts);
  };

  const fetchPosts = async () => {
    if (posts.length == 0) {
      try {
        fetch('https://jsonplaceholder.typicode.com/posts')
          .then((response) => response.json())
          .then((data) => {
            setDisplayPosts(
              data.filter((element) => element.id <= counter * 10)
            );
            setPosts(data);
            setCounter(counter + 1);
          });
      } catch (ex) {
        console.log(ex);
      }
    } else {
      const getPosts = posts.filter((element) => element.id <= counter * 10);
      if (getPosts.length == posts.length) {
        sethasMore(false);
      }
      setDisplayPosts(getPosts);
      setCounter(counter + 1);
    }
  };

  const fetchPostDataAsync = async () => {
    try {
      fetch('https://jsonplaceholder.typicode.com/posts')
        .then((response) => response.json())
        .then((data) => setPosts(data))
        .then(() => setCounter(1))
        .then(() => fetchPosts());
    } catch (ex) {
      console.log(ex);
    }
  };

  const searchHandler = (e) => {
    const text = e.target.value;
    setSearchField(text);

    const searchPosts = posts.filter((element) => element.title.includes(text));
    setDisplayPosts(searchPosts);
  };

  return (
    <div className="posts">
      <TextField
        className="search-field"
        id="outlined-basic"
        label="Search Posts"
        variant="outlined"
        value={searchField}
        onChange={searchHandler}
      />
      <InfiniteScroll
        dataLength={displayPosts.length}
        next={fetchPosts}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {displayPosts.map((element) => (
          <CardDetails
            onClick={() => {}}
            key={element.id}
            searchField={searchField}
            element={element}
            deletehandler={deletehandler}
          />
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default CardList;
