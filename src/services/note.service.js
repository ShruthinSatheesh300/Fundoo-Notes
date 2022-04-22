import Note from '../models/note.model';
import { client } from '../config/redis';
//TO create new note

export const create = async (body) => {

      const data = await Note.create(body);
      if(data){
        await client.del('getAllNote');
      
      return data;         //reffers the 'data'frm controller
      }
};

//TO retrive all notes

export const getAllNote = async (userId) => {
    const data = await Note.find({userId});
    if(data.length === 0){
      throw Error('No Note is Found')
    }else{
     await client.set('getAllNote',JSON.stringify(data))
    return data;
    }                          //reffers the 'data'frm controller
  };

//To retrive single note

export const getSingleNote = async (_id,userId) => {
    const data = await Note.findById({_id,userId});
    return data; //reffers the 'data'frm controller
  };

//TO update a  note

export const updateNote = async (_id, body) => {
    const data = await Note.findByIdAndUpdate(
      {
        _id
      },
      body,
      {
        new: true
      }
    );
    if(data){
      await client.del('getAllNote');
    
    return data;         //reffers the 'data'frm controller
    }
  };

  //To archive by ID
export const archiveNote = async (_id, body) => {
    const data = await Note.findByIdAndUpdate(
      {
        _id
      },
      body,
      {
        new: true
      }
    );
    if(data){
      await client.del('getAllNote');
    
    return data;         //reffers the 'data'frm controller
    }
  };
  
  //To add to Trash by id
  export const trashbin = async (_id, body) => {
    const data = await Note.findByIdAndUpdate(
      {
        _id
      },
      body,
      {
        new: true
      }
    );
    if(data){
      await client.del('getAllNote');
    
    return data;         //reffers the 'data'frm controller
    }
  };

//Delete note by id
export const delNote = async (userId) => {
    const data = await Note.findByIdAndDelete(userId);
    if(data){
      await client.del('getAllNote');
    
    return data;         //reffers the 'data'frm controller
    }
  };
