import React, { forwardRef, useState, useEffect } from 'react';
import { Button, Paper, Slide, TextField, Typography } from '@material-ui/core';
import Navbar from "./Navbar"
import axios from 'axios';
import Cookies from 'js-cookie';
import { Grid } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { getPosts } from './barkFetch';
import { Link } from "react-router-dom"

import Bark from '../templates/Bark';

export default function Home({ token }) {

  //const username = await axios.get(`/barks?token=${Cookies.get("token")}`)
  //console.log(username)

  // const username = await axios.get(`/barks?token=${Cookies.get{'token'})
  //axios.post('/barks', {token: Cookies.get('token')})

  //the component "followSuggestion" is a component with a list of all users to follow
  //sort barks from front end (aka here)

  //make backend send pack barks. can sort if need be
  //make backend send normal barks. we need to sort these

  //sort barks from front end (aka here)
  const [posts, setPosts] = useState([])

  const [renderedPosts, setRenderedPosts] = useState([]);
  const itemLimit = 10;

  useEffect(() => {
    const updatePosts = async () => {
      // setPosts(await getPosts('http://localhost:3001/api', token))
      setPosts([{ _id: 'a12', title: 'asdf', body: 'body' }])
    }
    updatePosts()
  }, []);

  useEffect(() => {
    setRenderedPosts(() => {
      const postSet = posts.slice(0, itemLimit);
      return postSet;
    });
  }, [posts]);

  return (
    <>
      {!token && <Link to='/login' />}
      <Grid container direction='column' justify='flex-start'>
        {renderedPosts.map((post) => {
          return <Bark key={post._id} object={post} />;
        })}
      </Grid>
    </>
  );
}
