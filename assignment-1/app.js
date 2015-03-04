var express = require('express'),
    app = express(),
    multer = require('multer'),
    path = require('path'),
    port = process.env.PORT || 3000;

var done = false;

module.exports = app;

app.use(multer({ dest: './uploads/',
    rename: function (fieldname, filename) {
        return filename+Date.now();
    },
    onFileUploadStart: function (file) {
        console.log(file.originalname + ' is starting ...')
    },
    onFileUploadComplete: function (file) {
        console.log(file.fieldname + ' uploaded to  ' + file.path)
        done=true;
    }
}));


app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, './', 'index.html'));
});

app.post('/api/photo',function(req,res){
    if(done==true){
        console.log(req.files);
        res.end("File uploaded.");
    }
});

if(require.main === module) {
    app.listen(port, function() {
        console.log('Server listening on port %s', port);
    });
}