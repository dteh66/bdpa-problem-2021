import React, { forwardRef, useState } from 'react';
import { Button, Paper, Slide, TextField, Typography } from '@material-ui/core';
import Navbar from "./Navbar"

export default function followSuggestions(props) {
  const currentUser = props.username.id

  //axios.get(`/barks?token=${Cookies.get{'token'})
  //axios.post('/barks', {token: Cookies.get('token')})

  const getPosts = async () => {
    //code needs to call backend, since the function/logic to get related follower suggestions will be in the backend

  };
///function: suggestion on who to follow component, current user is a parameter to be passed

  return (
    <p> hi </p>
  );
}

/* unused code that might be useful later:

const [posts, setPosts] = useState([]);
const [openForm, setOpenForm] = useState(false);

const getPosts = async () => {
  const response = await getAllPosts();
  console.log(response);
  setPosts(response);
};

const formik = useFormik({
  initialValues: { postTitle: '', postContent: '' },
  onSubmit: async (values) => await createPost(values),
});
*/