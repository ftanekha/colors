import express from 'express'
import cors from 'cors'
import createAllColorsDatabase from './createAllColorsDatabase.mjs'
import isSearchInputColorInDatabase from './utilities/isSearchInputColorInDatabase.mjs'

//import database
createAllColorsDatabase()

const server = express()

//Enable CORS for all routes
server.use(cors())

//Base route
server.get('/isSearchInputColorInDatabase/:colorName', (req, res) =>{
    const {colorName} = req.params
    const colorInfo = isSearchInputColorInDatabase(colorName)
    console.log(colorInfo)
    res.json(colorInfo)
})
// http://localhost:3000/isSearchInputColorInDatabase/yellow

const PORT = process.env.PORT || 3000
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})
