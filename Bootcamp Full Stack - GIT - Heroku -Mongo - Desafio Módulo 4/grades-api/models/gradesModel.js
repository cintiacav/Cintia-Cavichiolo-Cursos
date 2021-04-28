export default (mongoose) => {
  const schema = mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      require: true,
    },
    type: {
      type: String,
      require: true,
    },
    value: {
      type: Number,
      require: true,
      min: 0,
    },
    lastModified: {
      type: Date,
      default: Date.now(),
    },
  });

  const Grades = mongoose.model('grades', schema, 'grades');

  return Grades;
};
