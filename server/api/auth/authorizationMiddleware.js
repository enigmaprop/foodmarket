require('dotenv').config({path:'../.env'})

const {signToken} = require('./auth');;
const jwt = require('jsonwebtoken');

function authorizationMiddleware(req, res, next) {
    const keys = ['ADDKbbfaad30-c039-11ed-b78d-cb64bb1701fe' , 'ADDK970dc770-bf8d-11ed-a43b-cdbbd718d4fb'];
    const secret = process.env.SECRET;
      const authToken = req.headers.authorization.split(' ')[1]; // Get the token from the Authorization header
    try {
      // Verify the token using your secret key and decode its payload
      const decodedToken = jwt.verify(authToken, secret);
      // Check if the token payload includes the required role or any other authorization requirements

      if (keys.indexOf(decodedToken) != -1) {
        // User is authorized
        next();
      } else {
        // User is not authorized
        res.status(403).send('Forbidden');
      }

    
    } catch (err) {
      // Token is invalid or missing
      res.status(401).send('Unauthorized');
    }
  }
  
  module.exports = authorizationMiddleware;