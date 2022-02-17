const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    return Recipe.create({
      title: "Tomate Relleno",
      level: "Easy Peasy",
      ingridients: "tomatos with love",
      cuisine: "heladera",
      dishType: "main_course",
      duration: 3,
      creator: "Mi Abuela Ana",
    });
  })
  .then((response) => {
    console.log(response.title);

    return Recipe.insertMany(data);
  })
  .then((response) => {
    console.log(response)
    //  response.forEach((elem) => {
    //   console.log(elem.title);
    // });   
    
   // Recipe.findOneAndUpdate ( { title: "Rigatoni alla Genovese" }, { duration: 100 }, {new: true} ); //! SALE NULL Y NO SABEMOS PORQUÉ !!!!!!!!!!!!!!
   
   return Recipe.deleteOne({title: "Carrot Cake"})

  })
  .then((response) => { 
   console.log("me cargué la zanahoria ", response);
   return  mongoose.connection.close(MONGODB_URI)
  })
  
  //*PRUEBA PARA COMPROBAR LA CONNECT
 // .then((response)=>{
   // console.log("connexion close")
    // return Recipe.create({
    //   title: "Prueba de connect",
    //   level: "Easy Peasy",
    //   ingridients: "tomatos with love",
    //   cuisine: "heladera",
    //   dishType: "main_course",
    //   duration: 3,
    //   creator: "Mi Abuela Ana",
    // });

  // }).then ((response)=>{
  //   console.log(response)
  //* })  
  

  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
