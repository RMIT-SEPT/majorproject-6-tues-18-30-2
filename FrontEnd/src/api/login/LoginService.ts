import axios from 'axios';

/**
 * POST login User 
 * @param userDetails object containing user details from form
 */

export const loginUser = (userDetails) => {
    return axios.post(`api/authentication/login`, {
      
        "username": userDetails.username,
        "password": userDetails.password,
      
    },{
      baseURL: 'http://k8s.sept.mladenov.me',
      headers:{
        'Content-Type': 'application/json',
      }
    });
  };