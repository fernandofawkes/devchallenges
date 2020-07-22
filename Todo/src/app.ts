import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import todosRouter from './routes/todos';

const app = express();
app.use(cors());
app.use(express.json()) // for parsing application/json
app.use('/todos', todosRouter);

const PORT = process.env.PORT || 4000;
const uri: string = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.9ixpr.gcp.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
const options = { useNewUrlParser: true, useUnifiedTopology: true };

mongoose.set("useFindAndModify", false);

mongoose.connect(uri, options).then(() =>
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    )
  ).catch(error => {
    throw error
  });