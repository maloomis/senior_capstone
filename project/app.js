module.exports = function(app) {
    var model = require("./models/models.server.js")();
    require("./services/student.service.server.js")(app, model);
    require("./services/message.service.server.js")(app, model);
}