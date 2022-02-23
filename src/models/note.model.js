/* eslint-disable prettier/prettier */

import { Schema, model } from 'mongoose';

const noteSchema = new Schema(
  {
    Title: {
        type: String,
        required: true,
     },
      Description: {
        type: String,
        required: true,
     },
     Color:{
         type:String,
     },
     userId:{
         type:String,
         required: true,
         unique: true,
     }

    },

  {
    timestamps: true
  }
);

export default model('Note', noteSchema);