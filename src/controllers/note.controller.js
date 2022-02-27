import HttpStatus from 'http-status-codes';
import * as NoteService from '../services/note.service';

// To create new Note
export const create = async (req, res, next) => {
    try {
      const data = await NoteService.create(req.body);
      res.status(HttpStatus.CREATED).json({
        code: HttpStatus.CREATED,
        data: data,
        message: 'The Note is Created successfully'
      });
    } catch (error) {
      next(error);
    }
  };

//To retrieve all notes
export const getAllNotes = async (req, res, next) => {
    try {
        const data = await NoteService.getAllNotes();
        res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data,
        message: 'All notes fetched successfully'
    });
    }catch (error) {
        next(error);
    }
  };

//To retrieve single note by id
export const getSingleNote = async (req, res, next) => {
    try {
        const data = await NoteService.getSingleNote(req.params._id);
        res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data,
        message: 'Note fetched successfully'
      });
    } catch (error) {
        next(error);
    }
  };

  //TO update a note
  export const updateNote = async (req, res, next) => {
    try {
      const data = await NoteService.updateNote(req.params._id, req.body);
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data,
        message: 'Note updated successfully'
      });
    } catch (error) {
      next(error);
    }
  };
//To delete a note
  export const deleteNote = async (req, res, next) => {
    try {
      await NoteService.deleteNote(req.params._id);
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: [],
        message: 'Note deleted successfully'
      });
    } catch (error) {
      next(error);
    }
  };
