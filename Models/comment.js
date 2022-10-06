const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const CommentSchema = new Schema(
  {
    _user: { type: Schema.Types.ObjectId, ref: 'User' },
    _post: { type: Schema.Types.ObjectId, ref: 'Post' },

    text:{ type:String, required: true },

    likesNum: { type: Number, default: 0 },

    creaetd: Date,
    updated: Date
  },
  
);

CommentSchema.pre('save', function (next) {
    if( this.isNew )
      this.created = new Date();

    this.updated = new Date();

    next();
});

module.exports = Comment = mongoose.model('Comment', CommentSchema);