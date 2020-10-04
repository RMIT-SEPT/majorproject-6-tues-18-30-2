import axios from 'axios';

/**
 * POST login User 
 * @param userDetails object containing user details from form
 */

export const getProfile = () => {
    return axios.get(`/api/profile`,
    {
      baseURL: 'http://localhost:8082/',
      headers:{
        'Authorization': 'Bearer '.concat(localStorage.getItem('access_token')),
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    });
  };