console.log("Loading function");

const fs = require('fs');
const ejs = require('ejs')

// lambda proxy integration
exports.handler = (event, context, callback) => {
    console.log('Received event:', JSON.stringify(event, null, 2));
    const stage = event.requestContext.stage;
    const path = event.path;
    const filename = `./contents${event.path}/index.ejs`;
    console.log(filename);
    
    fs.readFile(filename, function(err, data) {
        if (err) return callback(null, {
            statusCode : 404,
            body: "404 Not Found!",
            headers : {
                ["content-type"] : 'text/html'
            }
        });
        const html = ejs.render(data.toString(), {stage});
        callback(null, {
            statusCode : 200,
            body: html,
            headers : {
                ["content-type"] : 'text/html'
            }
        }); 
    });
};