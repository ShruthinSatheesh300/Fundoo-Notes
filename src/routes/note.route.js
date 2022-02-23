/* eslint-disable prettier/prettier */
import express from 'express';
import * as noteController from '../controllers/note.controller';
import { newNoteValidator } from '../validators/note.validator';

const router = express.Router();

// TO create a new Note
router.post('/create', newNoteValidator, noteController.create);

//To retrieve all Notes
router.get('/getnote', noteController.getAllNotes);

// To retrieve a single Note by noteId
router.get('/:_id', noteController.getSingleNote);

// To update a Note by noteId
router.put('/updatenotes/:noteId', noteController.updateNote);

//TO delete a Note by noteId
router.delete('/deletenotes/:noteId', noteController.deleteNote);

export default router;