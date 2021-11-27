import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import { TextField } from '@mui/material';

import './card-list.styles.scss';
import CardDetails from '../card-details/card-details.component';

const CardList = ({ setUserDetail, setPostDetail }) => {
  const [posts, setPosts] = useState([]);
  const [displayPosts, setDisplayPosts] = useState([]);
  const [counter, setCounter] = useState(1);
  const [hasMore, sethasMore] = useState(true);
  const [searchField, setSearchField] = useState('');
  const [searching, setSearching] = useState(false);

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
    console.log('fetch is executed');
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
    if (text.length > 0) {
      setSearching(true);
    } else {
      setSearching(false);
    }
    setSearchField(text);

    const searchPosts = posts
      .filter((element) => element.id <= counter * 10)
      .filter((element) => element.title.includes(text));
    setDisplayPosts(searchPosts);
  };

  return (
    <div className="posts">
      <TextField className="search-field" id="outlined-basic" label="Search Posts" variant="outlined" value={searchField} onChange={searchHandler} />
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
            isSearching = {searching}
            element={element}
            deletehandler={deletehandler}
            setUserDetail={setUserDetail}
            setPostDetail={setPostDetail}
          />
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default CardList;
