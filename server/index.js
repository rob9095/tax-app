require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('./handlers/error');
const authRoutes = require('./routes/auth');
const projectsRoutes = require('./routes/projects');
const { loginRequired, ensureCorrectUser } = require('./middleware/auth');
const PORT = 8082;

app.use(cors())
app.use(bodyParser.json());

// all routes here
app.use('/api/auth', authRoutes);

// projects router
app.use(
		'/api',
		// loginRequired,
		// ensureCorrectUser,
		projectsRoutes);

// error handler
app.use(errorHandler);

app.listen(PORT, function(){
	console.log(`Server starting on port ${PORT}`)
});
