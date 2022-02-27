import Note from '../models/note.model';

//TO create new note

export const create = async (body) => {
       // const note = await Note.findOne({ userId: body.userId })
  //  if (note === null) {
      const data = await Note.create(body);
      return data; //reffers the 'data'frm controller
     // }else {
    // throw Error ('This Note Already Exists')
};

//TO retrive all notes

export const getAllNotes = async () => {
    const data = await Note.find();
    return data; //reffers the 'data'frm controller
  };

//To retrive single note

export const getSingleNote = async (_id) => {
    const data = await Note.findById(_id);
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

//TO delete a  note

export const deleteNote = async (id) => {
    await User.findByIdAndDelete(id);
    return '';//Nothing to return as data is del
  };
