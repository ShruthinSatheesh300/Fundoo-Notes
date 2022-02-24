/* eslint-disable prettier/prettier */
import jwt from 'jsonwebtoken';

export const generateToken = (searchData)=>{
    let token = jwt.sign({'email': searchData.email, 'id': searchData._id},
     process.env.SECRET_KEY);
return token;
}