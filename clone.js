var nodegit = require('nodegit'),
    path = require('path')

var url = "https://github.com/pazdera/scriptster.git",
    local = "./scriptster",
    cloneOpts = {};

nodegit.Clone(url, local, cloneOpts).then(function (repo) {
    console.log("Cloned " + path.basename(url) + " to " + repo.workdir());
}).catch(function (err) {
    console.log(err);
});