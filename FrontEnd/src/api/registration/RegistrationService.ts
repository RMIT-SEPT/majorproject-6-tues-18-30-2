import axios from 'axios';

/**
 * POST new User 
 * @param userDetails object containing user details from form
 */

export const registerUser = (userDetails) => {
    return axios.post("54.66.213.129", {
      params: {
        "username": userDetails.username,
        "firstName": userDetails.firstName,
        "lastName": userDetails.lastName,
        "password": userDetails.password,
        "streetNo": userDetails.streetNo,
        "streetName": userDetails.streetName,
        "postcode": userDetails.postcode,
        "phone": userDetails.phone
      }
    });
  };