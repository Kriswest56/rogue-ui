const Hapi = require('hapi');

const Config = require('../../config');
const {boardHandler} = require('../server/board/boardHandler');

const server = Hapi.server({
    port: 8081,
    host: 'localhost'
});

server.route(
    {
        method: 'GET',
        path: '/',
        handler: function (request, response) {
            return boardHandler(request, response);
        }
    },
    {
        method: 'GET',
        path: `/${Config.baseUrl}`,
        handler: (request, h) => {
            return 'Hello, world!';
        }
    },
    {
        method: 'GET',
        path: `/${Config.baseUrl}/{name}`,
        handler: (request, h) => {
    
            return 'Hello, ' + encodeURIComponent(request.params.name) + '!';
        }
    });


const init = async () => {

    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();