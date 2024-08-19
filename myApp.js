require("dotenv").config();
const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Mongoose connected successfully");
});

mongoose.connection.on("error", (err) => {
  console.error("Mongoose connection error:", err);
});

const personSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  age: Number,
  favoriteFoods: [String],
});

const Person = mongoose.model("Person", personSchema);

const createAndSavePerson = (done) => {
  const person = new Person({
    name: "Edwin",
    age: 25,
    favoriteFoods: ["water", "fried chicken"],
  })
  person.save(function(err, data) {
    if (err) return done(err);
    done(null, data);
  })
  
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function(err, data) {
    if (err) return done(err);
    done(null, data);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({
    name: personName
  }, function(err, data) {
    if (err) return done(err);
    done(null, data);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({
    favoriteFoods: food
  }, function(err, data) {
    if (err) return done(err);
    done(null, data);
  });
};

const findPersonById = (personId, done) => {
  Person.findById({
    _id: personId
  }, function(err, data) {
    if (err) return done(err);
    done(null, data);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById({ 
    _id: personId 
  }, function(err, data) {
    if (err) return done(err);

    data.favoriteFoods.push("hamburger");

    data.save((err, updatedPerson) => {
      if (err) return done(err); // Handle any errors during save

      done(null, updatedPerson); // Return the updated person document
    });
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  // Person.findOneAndUpdate(
  // { name: personName }, 
  // { age: ageToSet },
  // { new: true }
  // )
  // .then((doc) => {
  //   // console.log(doc);
  //   done(null, doc);
  // })
  // .catch((err) => {
  //   // console.error(err);
  //   done(err);
  // });

  Person.findOneAndUpdate(
    { name: personName }, 
    { age: ageToSet },
    { new: true },
    function(err, data) {
      if (err) return done(err);
      done(null, data);
    }
    )
};

const removeById = (personId, done) => {
  // Person.findOneAndRemove({
  //   _id: personId
  // })
  // .then((doc) => {
  //   done(null, doc);
  // })
  // .catch((err) => {
  //   done(err);
  // });

  Person.findOneAndRemove({
    _id: personId
  }, function(err, data) {
    if (err) return done(err);
    done(null, data);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  Person.remove({
    name: nameToRemove
  }, function(err, data) {
    if (err) return done(err);
    done(null, data);
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  Person.find({
    favoriteFoods: foodToSearch
  })
  // .skip(100)         
  .limit(2)                
  .sort({ name: 1 })     
  .select({ age: 0 }) 
  .exec(function(err, data) {
    if (err) return done(err);
    done(null, data);
  });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
