const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const PostSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User' },

    rePostsNum: { type: Number, default: 0 },

   post:[{
    text:{ type:String, required: true },

    images:[{type:String}]
   }], 

    creaetd: Date,
    updated: Date
  },
)

PostSchema.pre('save', function (next) {
    if( this.isNew )
      this.created = new Date();

    this.updated = new Date();

    next();
});

module.exports = Post = mongoose.model('Post', PostSchema);