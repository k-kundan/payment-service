import { Sequelize, DataTypes } from 'sequelize';

const sequelize = new Sequelize('postgres', 'postgres', 'password', {
  host: 'localhost',
  dialect: 'postgres'
});

async function connectDB() {
    try {
        await sequelize.authenticate();
        console.log("✅ Connection has been established successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
}

export { connectDB, sequelize, Sequelize, DataTypes };