import React from 'react';
import ReactDOM from 'react-dom';
import "bootstrap/dist/css/bootstrap.min.css";

import Booking from "./booking/Booking";

ReactDOM.render(<Booking userId={"u1"} userType={3} />, document.getElementById('root'));
