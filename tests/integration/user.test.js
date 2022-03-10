import { expect } from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';
import HttpStatus from 'http-status-codes';

import app from '../../src/index';

let userToken;

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
          expect(res.statusCode).to.be.equal(HttpStatus.BAD_REQUEST);
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
          expect(res.statusCode).to.be.equal(HttpStatus.BAD_REQUEST);
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
          userToken = res.body.data;
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
  // NOTES

  describe(`POST /create Note`, () => {

    it(' should create Note for Authorized User', (done) => {

      const noteTst = {

        Title: "NodeJs",
        Description: "CF NodeJs Batch",
        Color: "Red"
      };

      request(app)
        .post('/api/v1/note')
        .set('Authorization', `Bearer ${userToken}`)

        .send(noteTst)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.CREATED);
          done();
        });
    });
  });
  // Get All Notes
  describe(`GET /get All Notes`, () => {

    it(' should get all Notes of Authorized User', (done) => {

      const noteTst = {

        Title: "NodeJs",
        Description: "CF NodeJs Batch",
        Color: "Red"
      };

      request(app)
        .get('/api/v1/note')
        .set('Authorization', `Bearer ${userToken}`)

        .send(noteTst)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.OK);
          done();
        });
    });
  });
  //Get Note by _id
  describe(`GET /get Note By _id`, () => {

    it(' should get a Note by its _id  for Authorized User', (done) => {

      const noteTst = {

        Title: "NodeJs",
        Description: "CF NodeJs Batch",
        Color: "Red"
      };

      request(app)
        .get('/api/v1/note/6229f8f98004cb3dd0fe3c70')
        .set('Authorization', `Bearer ${userToken}`)

        .send(noteTst)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.OK);
          done();
        });
    });
  });
  // Update a note by _id
  describe(`PUT /update a  Note By _id`, () => {

    it(' should update  a Note by its _id  for Authorized User', (done) => {

      const noteTst = {

        Title: "NodeJs",
        Description: "CF NodeJs Batch",
        Color: "Blue"
      };

      request(app)
        .put('/api/v1/note/6229f8f98004cb3dd0fe3c70')
        .set('Authorization', `Bearer ${userToken}`)

        .send(noteTst)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.OK);
          done();
        });
    });
  });

  describe(`PUT /add a  Note to archive By _id`, () => {

    it(' should add a Note to archive by its _id  for Authorized User', (done) => {

      const noteTst = {

        Title: "NodeJs",
        Description: "CF NodeJs Batch",
        Color: "Red"
      };

      request(app)
        .put('/api/v1/note/6229f8f98004cb3dd0fe3c70')
        .set('Authorization', `Bearer ${userToken}`)

        .send(noteTst)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.OK);
          done();
        });
    });
  });

  describe(`PUT /add a  Note to TrashBin By _id`, () => {

    it(' should add a Note to TrashBin by its _id  for Authorized User', (done) => {

      const noteTst = {

        Title: "NodeJs",
        Description: "CF NodeJs Batch",
        Color: "Red"
      };

      request(app)
        .put('/api/v1/note/6229f8f98004cb3dd0fe3c70')
        .set('Authorization', `Bearer ${userToken}`)

        .send(noteTst)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.OK);
          done();
        });
    });
  });

  describe(`DELETE /delete a  Note to  By userId`, () => {

    it(' should delete  Note  by its userId  for Authorized User', (done) => {

      const noteTst = {

        Title: "NodeJs",
        Description: "CF NodeJs Batch",
        Color: "Red"
      };

      request(app)
        .delete('/api/v1/note/delete')
        .set('Authorization', `Bearer ${userToken}`)

        .send(noteTst)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.OK);
          done();
        });
    });
  });


});