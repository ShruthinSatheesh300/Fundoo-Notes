import User from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { sendMail } from '../utils/helper';


//create new user
export const userRegistration = async (body) => {
  const saltRounds = 10;
  const hasedPassword = bcrypt.hashSync(body.password, saltRounds);
  body.password = hasedPassword;
  const data = await User.create(body);
  return data;
};
//User Login part
export const login = async (body) => {
  const user = await User.findOne({ email: body.email });
  if (user === null) {
    throw new Error('User does not exist');
  } else {
    const validPassword = bcrypt.compareSync(body.password, user.password);
    if (validPassword) {
      const token = jwt.sign({ 'email': user.email, 'id': user._id },
        process.env.SECRET_CODE);
      return token;
    } else {
      throw new Error('password is invalid');
    }
  }
};
export const forgetPassword = async (body) => {
  const user = await User.findOne({ email: body.email });

  if ( user.email == body.email) {
    const token = jwt.sign({'email': user.email,'id':user._id},
    process.env.SECRET_KEY);
    const forgetmail= sendMail(user.email, token)
    
    return token;
    
  } else {
    throw new Error("User does not exist");
    
  }
  
};
export const resetPass = async (body) => {
  const data = await User.findByIdAndUpdate({_id: body.userID }, 
    {$set: {password: body.password}},
     {new: true} );
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(data.password, salt);
  data.password = hashPassword;
  return data;

};




  

