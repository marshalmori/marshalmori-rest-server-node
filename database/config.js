const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      //   useCreateIndex: true,
      //   useFindAndModify: false,
    });

    console.log("Base de dados online");
  } catch (error) {
    console.log(error);
    throw new Error("Erro ao iniciar a base de dados.");
  }
};

module.exports = {
  dbConnection,
};
