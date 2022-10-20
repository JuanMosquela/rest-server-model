const mongoose = require('mongoose')

const MONGODB_CNN = 'mongodb+srv://juan_mosquella:pqwxOOKSsdth61Pk@cluster-cafe.mhx6giv.mongodb.net/cafeDB'

const dbConnection = async() => {
    try {        
        await mongoose.connect( MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            
        })

        console.log('conectado a la base de datos ')
        
    } catch (error) {
        console.log(error)
        
    }

}

module.exports = {
    dbConnection
}