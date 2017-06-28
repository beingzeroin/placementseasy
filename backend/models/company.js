var mongoose = require("mongoose"),
    Schema = mongoose.Schema;

var companySchema = new mongoose.Schema({
    
        name: String
    description: String,
    //users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    created_at: Date,
    updated_at: Date,
    deleted: Boolean
});

companySchema.pre('save', function(next) {
    // get the current date
    var currentDate = new Date();

    // change the updated_at field to current date
    this.updated_at = currentDate;

    // if created_at doesn't exist, add to that field
    if (!this.created_at) {
        this.created_at = currentDate;
        this.deleted = false;
    }

    next();
});

module.exports = mongoose.model('company', companySchema);