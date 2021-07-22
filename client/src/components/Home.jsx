import React, { forwardRef, useState } from 'react';
import { Button, Paper, Slide, TextField, Typography } from '@material-ui/core';
import Navbar from "./Navbar"

export default function Home(props) {
/*
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

  return (
    <Navbar />
  );
}
