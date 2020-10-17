import axios from 'axios';

/**
 * GET view User profile
 * @param userDetails object containing user details from form
 */

export const getProfile = () => {
    return axios.get(`/api/profile/me`,
    {
      baseURL: 'http://k8s.sept.mladenov.me',
      headers:{
        'Authorization': 'Bearer '.concat(localStorage.getItem('access_token')),
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    });
  };
