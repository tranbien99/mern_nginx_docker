const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')
require('dotenv').config()
const cors = require('cors')

const authRouter = require('./src/routes/auth')
const courseRouter = require('./src/routes/course')

const app = express()

const connectDB = async () => {
	try {
		await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@wylt-mern.y5fax.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,{
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		console.log('MongoDB connect successfully')
	} catch (error) {
		console.log(error.message)
	}
}

connectDB()

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => res.send('Server is running'))
app.use('/api/auth', authRouter)
app.use('/api/courses', courseRouter)

router.use(function(req, res) {
    res.sendFile(path.join(__dirname, '../client','build','index.html'));
});

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`SERVER start on port ${PORT}`))