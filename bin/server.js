if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const PORT = process.env.PORT || 3000;
const app = require('../app');
const http = require('http');
const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`🚀  Server ready at ${PORT}`);
})