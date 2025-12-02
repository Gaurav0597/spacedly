import express from 'express';
import baseRoutes from './routes/index';
import cookieParser from 'cookie-parser';
import { errorHandler, routeNotFound } from './middlewares/errorHandler';
import passport from './config/passport';
import './models/associations';
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// routes
app.use('/api', baseRoutes);

app.use(passport.initialize());

// global handlers
app.use(routeNotFound);
app.use(errorHandler);

export default app;
