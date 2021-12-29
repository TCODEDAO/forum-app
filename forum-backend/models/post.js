const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    minlength: 3
  },
  date: Date,
  user: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  username: {
    type: String,
  },
  avatar: {
    type: String,
  },
  thread: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Thread'
  }
})

postSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Post = mongoose.model('Post', postSchema)

module.exports = Post