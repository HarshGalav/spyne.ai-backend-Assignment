// server.js
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user.routes');
const discussionRoutes = require('./routes/discussion.routes');
const commentRoutes = require('./routes/comment.routes');
var cors = require('cors')


const app = express();
app.use(express.json());
app.use(cors())
// Database connection
mongoose.connect('mongodb://localhost/backend-assignment', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Routes
app.use('/users', userRoutes);
app.use('/discussions', discussionRoutes);
app.use('/comments', commentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
