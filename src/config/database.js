 import mongoose from 'mongoose';
import logger from './logger';

const database = async () => {
  try {
    // Replace database value in the .env file with your database config url
    // const DATABASE =
    //   process.env.NODE_ENV === 'test'
    //     ? process.env.DATABASE_TEST
    //     : process.env.DATABASE;
           const DATABASE;

        if( process.env.NODE_ENV === 'test'){
           DATABASE = process.env.DATABASE_TEST
        }else{
          DATABASE  = process.env.DATABASE
        }

    await mongoose.connect(DATABASE, {
      useFindAndModify: false,
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    logger.info('Connected to the database.');
  } catch (error) {
    logger.error('Could not connect to the database.', error);
  }
};
export default database;
