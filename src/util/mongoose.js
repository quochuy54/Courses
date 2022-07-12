module.exports = {
    MutiMongooseToOjbect: function(mongooses){
        return mongooses.map(mongoose => mongoose.toObject())
    },
    MongooseToOjbect: function(mongoose){
        return mongoose ? mongoose.toObject() : mongoose
    }
}