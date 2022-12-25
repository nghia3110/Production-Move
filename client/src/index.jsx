import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { ContextProvider } from './context/ContextProvider';
import { registerLicense } from '@syncfusion/ej2-base';

registerLicense('Mgo+DSMBaFt/QHRqVVhjVFpFaV1GQmFJfFBmQ2laf1R1ckU3HVdTRHRdQ19hTH5Udk1mWnpXdXU=;Mgo+DSMBPh8sVXJ0S0J+XE9HflRDQmFNYVF2R2BJeVRzdF9DZkwgOX1dQl9hSHxRc0VkWXdbc3JUR2E=;ORg4AjUWIQA/Gnt2VVhkQlFadVdJXHxLekx0RWFab1h6d1VMZVpBNQtUQF1hS39RdEBjXn9WdXdTRWld;ODE0ODEyQDMyMzAyZTM0MmUzME1LK0F3aEc2RnRsUjFUVkJSNUZ3bXFRK00yMzBPNzhyaEZPMnluNDZsbFU9;ODE0ODEzQDMyMzAyZTM0MmUzME05T2xLYXczZHBxVFIvbXdjUmhwUnV2VEc5Q3pSVSt5MVc3LzVzTUgyOE09;NRAiBiAaIQQuGjN/V0Z+WE9EaFxKVmJWfFdpR2NbfE52flZGallXVAciSV9jS3xSdEdmWXheeHFWQWBYUA==;ODE0ODE1QDMyMzAyZTM0MmUzMEIwZ0daNGtpQUYrVUJqTXllL2RLTW5oZWRhWDVkbzhwSU9kNmxRSFpmYmc9;ODE0ODE2QDMyMzAyZTM0MmUzMEppSU01NnQvTlA3VjdyQTdXY2lNVk1yYW9INUljRzRHQVN1SU1RRUxwWDA9;Mgo+DSMBMAY9C3t2VVhkQlFadVdJXHxLekx0RWFab1h6d1VMZVpBNQtUQF1hS39RdEBjXn9WdXdSQWBd;ODE0ODE4QDMyMzAyZTM0MmUzMGlZN0c1TWt6NjZoSEt5Y0RDK0liSVAvbkpLcWFweStoc2pXNWRzMk5taE09;ODE0ODE5QDMyMzAyZTM0MmUzMGVYWU1ycjFId0ZRbjdMc1pqT0Y4VVZwOVBIWVFTNUxuZGlDZFhOS080Vnc9;ODE0ODIwQDMyMzAyZTM0MmUzMEIwZ0daNGtpQUYrVUJqTXllL2RLTW5oZWRhWDVkbzhwSU9kNmxRSFpmYmc9');

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ContextProvider>
      <App />
    </ContextProvider>
  </React.StrictMode>
);