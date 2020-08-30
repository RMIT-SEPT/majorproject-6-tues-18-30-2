import React from 'react';
import ReactDOM from 'react-dom';
import "bootstrap/dist/css/bootstrap.min.css";

import Dashboard from "./dashboard/Dashboard";

ReactDOM.render(<Dashboard userId={"u1"} userType={3} />, document.getElementById('root'));
