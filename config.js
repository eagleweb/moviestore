var mongoosePaginate = require('mongoose-paginate');
mongoosePaginate.paginate.options = {
    lean:  true
};

module.exports = {
    'port': process.env.PORT || 8080,
    'database': '',
    'corsOptions': {
        origin: 'http://localhost:63342',
        preflightContinue: true,
        optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
    }
};