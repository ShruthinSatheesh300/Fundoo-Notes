import { expect } from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';
import HttpStatus from 'http-status-codes';

import app from '../../src/index';

describe('Users APIs Test', () => {
  before((done) => {
    const clearCollections = () => {
      for (const collection in mongoose.connection.collections) {
        mongoose.connection.collections[collection].deleteOne(() => { });
      }
    };

    const mongooseConnect = async () => {
      await mongoose.connect(process.env.DATABASE_TEST);
      clearCollections();
    };

    if (mongoose.connection.readyState === 0) {
      mongooseConnect();
    } else {
      clearCollections();
    }

    done();
  });


  describe(`POST /userregister`, () => {

    it('should register new user', (done) => {

      const userTst = {
        firstName: "Shruthin",
        lastName: "Satheesh",
        email: "vishnu7038@gmail.com",
        password: "vishnu135"
      };

      request(app)
        .post('/api/v1/users/userregister')
        .send(userTst)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.CREATED);
          done();
        });
    });

    it('should give a error of Name required', (done) => {

      const userTst = {
        firstName: "",
        lastName: "Satheesh",
        email: "vishnu7038@gmail.com",
        password: "vishnu135"
      };

      request(app)
        .post('/api/v1/users/userregister')
        .send(userTst)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.INTERNAL_SERVER_ERROR);
          done();
        });
    });

    it('should give a error of last name is required', (done) => {

      const userTst = {
        firstName: "Shruthin",
        lastName: "",
        email: "vishnu7038@gmail.com",
        password: "vishnu135"
      };

      request(app)
        .post('/api/v1/users/userregister')
        .send(userTst)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.INTERNAL_SERVER_ERROR);
          done();
        });
    });

  });

  describe(`POST /login`, () => {

    it('should login with user', (done) => {

      const userTst = {

        email: "vishnu7038@gmail.com",
        password: "vishnu135"
      };

      request(app)
        .post('/api/v1/users/login')
        .send(userTst)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.OK);
          done();
        });
    });
  });


  describe(`POST/forgot`, () => {

    it('when forget password an email should be sent ', (done) => {

      const userTst = {

        email: "vishnu7038@gmail.com"

      };

      request(app)
        .post('/api/v1/users/forgot')
        .send(userTst)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.OK);
          done();
        });
    });
  });
  describe(`PUT/setpass`, () => {
    it('should reset the with new password', (done) => {
      const userTst = {
        password: "vishnuNew"
      };
      const jwToken = " Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InZpc2hudTcwMzhAZ21haWwuY29tIiwiaWQiOiI2MjI1NzA0OTk5N2RiMDI0YzhkNDhjNTYiLCJpYXQiOjE2NDY2MjA3NDV9.L1aADLHERXuHe7QnX3I0q2cys6Z02ctKCUyCgXdC3nk";

      request(app)
        .put('/api/v1/users/setpass')
        .set('Authorization', `${jwToken}`)
        .send(userTst)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.OK);
          done();
        });
    });
  });

});