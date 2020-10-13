import axios from 'axios';

/**
 * PUT view User profile 
 * @param userDetails object containing user details from form
 */

export const putProfileUpdate = (userUpdate) => {
      return axios.put(`/api/profile`,{
        department: userUpdate.department,
        country: userUpdate.country,
        organisation: userUpdate.organisation,
        first_name: userUpdate.firstName,
        last_name: userUpdate.lastName
      },
    {
      baseURL: 'http://localhost:8082/',
      headers:{
        'Authorization': 'Bearer '.concat(localStorage.getItem('access_token')),
        'Content-Type': 'application/json',
      }
    });
  };