import express from 'express';
import * as noteController from '../controllers/note.controller';
import { userAuth } from '../middlewares/auth.middleware';
import { newNoteValidator } from '../validators/user.validator';
import { checkGetAllNote  } from '../middlewares/redis.middleware';

const router = express.Router();

// TO create a new Note
router.post('', newNoteValidator,userAuth, noteController.create);

//To retrieve all Notes
router.get('',checkGetAllNote, userAuth, noteController.getAllNote);

// To retrieve a single Note by noteId
router.get('/:_id',userAuth, noteController.getSingleNote);

// To update a Note by noteId
router.put('/:_id',userAuth, noteController.updateNote);

router.put('/archive/:_id',userAuth, noteController.archiveNote);

//To move in Trashbin
router.put('/bin/:_id',userAuth, noteController.trashbin);

//To del by Id
router.delete('/:_id',userAuth,noteController.delNote)

export default router;