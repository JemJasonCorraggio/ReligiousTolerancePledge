exports.DATABASE_URL =
    process.env.DATABASE_URL ||
    global.DATABASE_URL ||
    'mongodb://ladyjem:bestrong9@ds249565.mlab.com:49565/pledge';
exports.PORT = process.env.PORT || 8080;