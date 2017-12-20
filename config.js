var mongoosePaginate = require('mongoose-paginate');
mongoosePaginate.paginate.options = {
    lean:  true
};

module.exports = {
    'port': process.env.PORT || 8080,
    'database': 'mongodb://eagleweb:751803os@ds155529.mlab.com:55529/db-spa',
    'corsOptions': {
        origin: '*',
        preflightContinue: true,
        optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
    },
    'secret': 'verystrongpassword'
};