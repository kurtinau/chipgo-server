module.exports = {
    notFoundResponse: function(res){
        res.sendStatus(404);
        // return JSON.stringify({"status": 500, "error": 'Bad request.', "response": null});
    },
    errorResponse: function (res, error) {
        res.sendStatus(500);
        // return JSON.stringify({"status": 500, "error": error, "response": null});
    },
    get_put_successResponse: function (res, data) {
        res.status(200).send(JSON.stringify({"response": data}));
        // return JSON.stringify({"status": 200, "error": null, "response": data});
    },
    create_successResponse: function (res, data) {
        res.status(201).send(JSON.stringify({"response": data}));
        // return JSON.stringify({"status": 201, "error": null, "response": data});
    },
    create_failResponseWithAlreadyExisted: function (res) {
        //conflict
        res.sendStatus(409);
        // return JSON.stringify({"status": 409, "error": 'Already Existed.', "response": null});
    }
};