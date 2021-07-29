// import { useState, useEffect } from 'react';
import axios from 'axios';

async function getPosts(url, token) {
    // const data = {
    //     _id: '',
    //     title: '',
    //     body: '',
    //     created: '',
    //     __v: 0,
    // }

    try {
        // return axios.get(url)
        return axios
            .get(url, { params: { token } })
    }
    catch { return [] }
    // .then((result) => setData(result.data));
    // async function getData() {
    //     await axios
    //         .get(url, { params: { token } })
    //         .then((result) => setData(result.data));
    // }

    // useEffect(() => getData(), []);
    // return [data, setData];
}

export { getPosts }