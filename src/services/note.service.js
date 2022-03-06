import Note from '../models/note.model';

//TO create new note

export const create = async (body) => {

      const data = await Note.create(body);
      return data;         //reffers the 'data'frm controller
     
};

//TO retrive all notes

export const getAllNotes = async (userId) => {
    const data = await Note.find({userId});
    if(data.length === 0){
      throw Error('No Note is Found')
    }else{
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
    return data; //reffers the 'data'frm controller
  };

  //To archive by ID
export const archiveNote = async (_id) => {
    const data = await Note.findByIdAndUpdate(
      {
        _id
      },
      {
       $set: { isArchived: true },
      }, {
        new: true
      }
    );
    return data;
  };
  
  //To add to Trash by id
  export const trashbin = async (_id) => {
    const data = await Note.findByIdAndUpdate(
      {
        _id
      },
      {
       $set: { isDeleted: true },
      }, {
        new: true
      }
    );
    return data;
  };

//Delete note by id
export const delNote = async (userId) => {
    await Note.findByIdAndDelete(userId);
    return '';
  };
