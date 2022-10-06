const mongoose = require('mongoose')
const Schema = mongoose.Schema

const followBlockedSchema = new Schema({
    followers: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId, ref: 'User'
             },
        date: {
            type: Date,
            default: Date.now
        }
    }],

    blocked: [
        {
            userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            date: {
                type: Date,
                default: Date.now
            }
        }],

})

followBlockedSchema.pre('save', function (next) {
    if( this.isNew )
      this.created = new Date();

    this.updated = new Date();

    next();
});
module.exports = mongoose.model('FollowBlocked', followBlockedSchema)