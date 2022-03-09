import User from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { sendMail } from '../utils/helper';
import { client } from '../config/redis';
import { producer } from '../utils/RabbitMQ';

//create new user
export const userRegistration = async (body) => {
  const user = await User.findOne({ email: body.email })
  if(user==null){

  
  const saltRounds = 10;
  const hasedPassword = bcrypt.hashSync(body.password, saltRounds);
  body.password = hasedPassword;
  const data = await User.create(body);
  // if(data){
  //   await client.del('getAllNote');
  
  // return data;
  // }
  
  producer(data);
return data;
  }
  else{
  throw new Error('Email already Exists')
  }
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

  if (user.email == body.email) {
    const token = jwt.sign({ 'email': user.email, 'id': user._id },
      process.env.SECRET_KEY);
    const forgetmail = await sendMail(user.email, token)

    return token;

  } else {
    throw new Error("User does not exist");

  }

};
export const resetPass = async (body) => {
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(body.password, salt);
  body.password = hashPassword;
  const data = await User.findOneAndUpdate({ _id: body.userID },
    { password: body.password },
    { new: true });
  return data;

};






