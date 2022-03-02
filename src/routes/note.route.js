import express from 'express';
import * as noteController from '../controllers/note.controller';
import { userAuth } from '../middlewares/auth.middleware';
import { newNoteValidator } from '../validators/user.validator';

const router = express.Router();

// TO create a new Note
router.post('/create', newNoteValidator,userAuth, noteController.create);

//To retrieve all Notes
router.get('/getnote', noteController.getAllNotes);

// To retrieve a single Note by noteId
router.get('/_id', noteController.getSingleNote);

// To update a Note by noteId
router.put('/_id', noteController.updateNote);

router.put('/archive/:_id', noteController.archiveNote);

//To move in Trashbin
router.put('/bin/:_id', noteController.trashbin);

export default router;