exports.DATABASE_URL = process.env.DATABASE_URL || global.DATABASE_URL || 'mongodb://admin:admin@ds117739.mlab.com:17739/wellness-organizer';
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL ||
    'mongodb://admin:admin@ds117739.mlab.com:17739/wellness-organizer';
exports.PORT = process.env.PORT || 8081;
