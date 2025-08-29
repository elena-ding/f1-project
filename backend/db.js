const { MongoClient } = require('mongodb');

let dbConnection;

module.exports = {
    connectToDb: (cb) => {
        const uri = process.env.MONGODB_URI;
        if (!uri) {
            return cb(new Error("MONGODB_URI not set in environment"));
        }
        MongoClient.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            tls: true,
            tlsAllowInvalidCertificates: false
        })
            .then((client) => {
                dbConnection = client.db("f1Project");
                return cb();
            })
            .catch((err) => {
                console.log('error: ', err);
                return cb(err);
            })
    },
    getDb: () => { return dbConnection }
}
