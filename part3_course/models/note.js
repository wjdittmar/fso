const mongoose = require("mongoose");

const url = process.env.MONGODB_URI;

mongoose.set("strictQuery", false);
mongoose
  .connect(url)
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
});

// this updates it so that when you call the toJSON method
// or any method that calls toJSON on the noteSchema model
// that you transform the resulting output
// to remove the _id field
// and the __v field

noteSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    // this seems kind of magic that output
    // will automatically create the id field even if it does not exist
    // e.g.
    // returnedObject.fakeField = returnedObject._id.toString();
    // would create a fakeField variable in the JSON output

    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Note", noteSchema);
