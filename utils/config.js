import dotenv from 'dotenv'
dotenv.config()

const PORT = process.env.PORT || 5000

const url = 
process.env.NODE_ENV === 'test'
? process.env.TEST_url
: process.env.MONGO_URL

export default {
    PORT,
    url,
}