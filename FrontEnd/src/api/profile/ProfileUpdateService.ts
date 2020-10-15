import axios from 'axios';

/**
 * PUT view User profile 
 * @param userDetails object containing user details from form
 */

export const putProfileUpdate = (userUpdate) => {
      return axios.put(`/profile`,{
        department: userUpdate.department,
        country: userUpdate.country,
        organisation: userUpdate.organisation,
        first_name: userUpdate.firstName,
        last_name: userUpdate.lastName
      },
    {
      baseURL: 'http://k8s.sept.mladenov.me/api/profile',
      headers:{
        'Authorization': 'Bearer '.concat(localStorage.getItem('access_token')),
        'Content-Type': 'application/json',
      }
    });
  };