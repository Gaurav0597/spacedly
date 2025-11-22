import express from 'express';
import sequelize from './config/database';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log('Database connneted and models synchronized');
    app.listen(process.env.PORT, () => {
      console.log(`Server is running at port  ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log('unable to connect to database', error);
  });
export default app;
