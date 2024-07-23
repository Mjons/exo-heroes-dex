These are the codes you need to change if you ant to run it locally:


// src/services/api.js
import axios from 'axios';

 const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';
//const API_BASE_URL = process.env.REACT_APP_API_URL || '';



.env
 #Local Development Environment Variables
  REACT_APP_API_URL=http://localhost:3001
  REACT_APP_NODE_ENV=development
  PORT=3002


# Production Environment Variables
# Uncomment these when deploying to production
#REACT_APP_API_URL=https://salty-lowlands-40395-d2184796b235.herokuapp.com/
#REACT_APP_NODE_ENV=production


on terminal CMD to start:

\exo-heroes-dex\backend>node server.js
\exo-heroes-dex\frontend>yarn start

If AUTH is asked type your Username of GitHub and use the TOKEN PAT as your PW 