const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  
  post: [
    {
      text: { type: String, trim:true, required: true },

      images: [{ type: String }],
    },
  ],
  
  followers: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],

  blocked: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  
  comments: {
    type: String,
  },
  
  likes: [
    {
      userId: { type: Schema.Types.ObjectId, ref: "User" },
      
    },
  ],

  userId: { type: Schema.Types.ObjectId, ref: "User" },
  
  creaetd: Date,
  updated: Date,
});


PostSchema.pre('remove', async function (next) {
  await this.model('User').deleteMany({ post: this._id });
});


module.exports = Post = mongoose.model("Post", PostSchema);
