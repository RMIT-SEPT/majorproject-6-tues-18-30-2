import axios from 'axios';

/**
 * POST login User 
 * @param userDetails object containing user details from form
 */

export const loginUser = (userDetails) => {
    return axios.post(`/api/login`, {
      
        "username": userDetails.username,
        "password": userDetails.password,
      
    },{
      baseURL: 'http://localhost:8080/',
      headers:{
        'Content-Type': 'application/json',
      }
    });
  };