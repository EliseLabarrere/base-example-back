const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false
  }
);

const Company = require("./Company")(sequelize, Sequelize);
const CostSheet = require("./CostSheet")(sequelize, Sequelize);
const CSAdminVariable = require("./CSAdminVariable")(sequelize, Sequelize);
const CSUserPurchase = require("./CSUserPurchase")(sequelize, Sequelize);
const CSUserSold = require("./CSUserSold")(sequelize, Sequelize);
const User = require("./User")(sequelize, Sequelize);

// // Define relations
// User.hasMany(CostSheet, { foreignKey: "authorId" });
// CostSheet.belongsTo(User, { foreignKey: "authorId" });


// Définition des relations

// 1️⃣ Un User peut avoir plusieurs CostSheets
User.hasMany(CostSheet, { foreignKey: "idUser", onDelete: "CASCADE" });
CostSheet.belongsTo(User, { foreignKey: "idUser" });

// 2️⃣ Un CostSheet peut avoir plusieurs Companies
CostSheet.hasMany(Company, { foreignKey: "idCompany", onDelete: "CASCADE" });
Company.belongsTo(CostSheet, { foreignKey: "idCompany" });

// 3️⃣ Une CostSheet peut avoir plusieurs CSUserPurchases
CostSheet.hasMany(CSUserPurchase, { foreignKey: "idCostSheet", onDelete: "CASCADE" });
CSUserPurchase.belongsTo(CostSheet, { foreignKey: "idCostSheet" });


// Synchronise database
sequelize.sync({ alter: true })
  .then(() => console.log("✅ Tables synchronized successfully."))
  .catch((error) => console.error("❌ Error synchronizing tables:", error));

module.exports = {
  Company,
  CostSheet,
  CSAdminVariable,
  CSUserPurchase,
  CSUserSold,
  User,
  sequelize,
  Sequelize,
};