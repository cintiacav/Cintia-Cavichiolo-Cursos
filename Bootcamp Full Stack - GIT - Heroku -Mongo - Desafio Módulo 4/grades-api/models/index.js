import mongoose from 'mongoose';
import gradesModel from './gradesModel.js';

const db = {};
db.url = process.env.MONGOURL;
db.mongoose = mongoose;
db.grades = gradesModel(mongoose);

export { db };
