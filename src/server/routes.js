const Hapi = require('hapi');
const HapiReactViews = require('hapi-react-views');
const Vision = require('vision');

require('babel-core/register')({
    presets: ['react', 'env']
});

const Config = require('../../config');
const {pageHandler} = require('./pageHandler');

const LANDING = 'landing';

const server = Hapi.server({
    port: 8081,
    host: 'localhost'
});

server.route(
    {
        method: 'GET',
        path: '/',
        handler: function (request, h) {
            return pageHandler(request, h, LANDING);
        }
    },
    {
        method: 'GET',
        path: `/${Config.baseUrl}`,
        handler: (request, h) => {
            return pageHandler(request, h, LANDING);
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

    await server.register(Vision);

    server.views({
        engines: {
            jsx: HapiReactViews,
            hbs: require('handlebars')
        },
        relativeTo: __dirname,
        path: './',
    });

    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();