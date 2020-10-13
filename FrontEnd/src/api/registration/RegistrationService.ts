import axios from 'axios';

/**
 * POST new User 
 * @param userDetails object containing user details from form
 */

export const registerUser = (userDetails) => {
    return axios.post(`/api/register`, {
      
        "username": userDetails.username,
        "first_name": userDetails.firstName,
        "last_name": userDetails.lastName,
        "password": userDetails.password,
        "street_no": userDetails.streetNo,
        "street_name": userDetails.streetName,
        "postcode": userDetails.postcode,
        "phone": userDetails.phone
      
    },{
      baseURL: 'http://localhost:8081',
      headers:{
        'Content-Type': 'application/json',
      }
    });
  };