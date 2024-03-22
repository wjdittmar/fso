/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');

const url = process.env.MONGODB_URI;

mongoose.set('strictQuery', false);
mongoose
    .connect(url)
    .then(() => {
        console.log('connected to MongoDB');
    })
    .catch((error) => {
        // eslint-disable-next-line no-console
        console.log('error connecting to MongoDB:', error.message);
    });

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
})

// this updates it so that when you call the toJSON method
// or any method that calls toJSON on the noteSchema model
// that you transform the resulting output
// to remove the _id field
// and the __v field

blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        // this seems kind of magic that output
        // will automatically create the id field even if it does not exist
        // e.g.
        // returnedObject.fakeField = returnedObject._id.toString();
        // would create a fakeField variable in the JSON output

        // eslint-disable-next-line no-param-reassign
        returnedObject.id = returnedObject._id.toString();
        // eslint-disable-next-line no-param-reassign
        delete returnedObject._id;
        // eslint-disable-next-line no-param-reassign
        delete returnedObject.__v;
    },
});

module.exports = mongoose.model('Blog', blogSchema);
