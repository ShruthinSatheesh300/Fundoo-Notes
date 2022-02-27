import express from 'express';
import * as noteController from '../controllers/note.controller';
import { userAuth } from '../middlewares/auth.middleware';
import { newNoteValidator } from '../validators/user.validator';

const router = express.Router();

// TO create a new Note
router.post('', newNoteValidator, userAuth, noteController.create);

//To retrieve all Notes
router.get('', noteController.getAllNotes);

// To retrieve a single Note by noteId
router.get('/get/:_id', noteController.getSingleNote);

// To update a Note by noteId
router.put('/update/:_id', noteController.updateNote);

//TO delete a Note by noteId
router.delete('/todel/:_id', noteController.delById);

//To move in Archive
router.put('/archive/:_id', noteController.archiveNote);

export default router;