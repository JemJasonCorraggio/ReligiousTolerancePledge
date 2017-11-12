exports.DATABASE_URL =
    process.env.DATABASE_URL ||
    global.DATABASE_URL ||
    'mongodb://ladyjem:bestrong9@ds249565.mlab.com:49565/pledge';
exports.PORT = process.env.PORT || 8080;
exports.TEST_DATAEBASE_URL = process.env.TEST_DATABASE_URL||'mongodb://ladyjem:bestrong9@ds255715.mlab.com:55715/test-pledge';