const pool = require('../config/database');
const getSql = require('../util/get');
const postSql = require('../util/post');
const putSql = require('../util/put');
const deleteSql = require('../util/delete');
const resUtil = require('../util/responseUtil');
const trimUtil = require('../util/trimUtil');


function callback(connection, res, error, results) {
    if (error) {
        resUtil.notFoundResponse(res);
        // res.status(500).send(resUtil.errorResponse(error));
        //If there is error, we send the error in the error section with 500 status
    } else {
        // res.status(200).send(resUtil.get_put_successResponse(results));
        resUtil.get_put_successResponse(res, results);
        // console.log('The solution is: ', results);
        //If there is no error, all is good and response is 200OK.
    }
    // And done with the connection.
    pool.releaseConnection(connection);
}

function callback_201(connection, res, error, results) {
    if (error) {
        resUtil.notFoundResponse(res);
        //If there is error, we send the error in the error section with 500 status
    } else {
        resUtil.create_successResponse(res, results);
        // res.status(201).send(resUtil.create_successResponse(results));
        // console.log('The solution is: ', results);
        //If there is no error, all is good and response is 200OK.
    }
    // And done with the connection.
    pool.releaseConnection(connection);
}

function callback_409(connection, res) {
    resUtil.create_failResponseWithAlreadyExisted(res);
    // res.status(409).send(resUtil.create_failResponseWithAlreadyExisted());
    pool.releaseConnection(connection);
}

function callback_404(res,connection) {
    resUtil.notFoundResponse(res);
    pool.releaseConnection(connection);
}


module.exports = {
    find_all: function (req, res) {
        const table_name = trimUtil.trim2tableName(req.path);
        // console.log(table_name);
        pool.getConnection(function (err, connection) {
            connection.execute(getSql.find_all(table_name), function (error, results) {
                callback(connection, res, error, results);
            });
        });
    },
    find_by_id: function (req, res) {
        // console.log(req.path);
        const reqField = trimUtil.trimPathFrom2Str(req.path);
        const tableName = reqField[0];
        // console.log(tableName);
        const id = parseInt(reqField[1]);
        pool.getConnection(function (err, connection) {
            connection.execute(getSql.find_by_fields(tableName, ['id']), [id], function (error, results) {
                callback(connection, res, error, results);
            });
        });
    },
    create_new: function (req, res) {
        const tableName = trimUtil.trim2tableName(req.path);
        // let data = {...req.body.data};
        const columns = Object.keys(req.body.data);
        const values = Object.values(req.body.data);
        pool.getConnection(function (err, connection) {
            connection.execute(postSql.insert_into(tableName, columns), values, function (error, results) {
                if (error) {
                    callback_201(connection, res, error, results);
                } else {
                    connection.query(getSql.select_last_insert_id(),function (error, results) {
                        if (error) {
                            callback_201(connection, res, error, results);
                        }else{
                            // console.log('result: ',results[0]['LAST_INSERT_ID()']);
                            const lastInsertId = results[0]['LAST_INSERT_ID()'];
                            connection.execute(getSql.find_by_fields(tableName, ['id']), [lastInsertId], function (error, results) {
                                callback_201(connection, res, error, results);
                            });
                        }
                    });
                }
            });
        });
    },
    update_by_id: function (req, res) {
        const reqField = trimUtil.trimPathFrom2Str(req.path);
        const tableName = reqField[0];
        const id = parseInt(reqField[1]);
        const newData = req.body.data;
        let columns = Object.keys(newData);
        const values = Object.values(newData);
        columns = columns.map(field => field.toLowerCase());
        if (columns.includes('id')) {
            const idPosition = columns.indexOf('id');
            if (idPosition !== columns.length) {
                columns.splice(idPosition, 1);
                values.splice(idPosition, 1);
            }
        }
        values.push(id);
        columns.push('id');
        // console.log('colums: ',columns);
        // console.log('values: ',values);
        const findSql = 'select * from ' + tableName + ' where id = ' + id + ';';
        const sql = putSql.update_by_fields_and(tableName, columns, 1);
        console.log(sql);
        pool.getConnection(function (err, connection) {
            connection.execute(sql, values, function (error, results) {
                if (error) {
                    callback(connection, res, error, results);
                } else {
                    connection.execute(getSql.find_by_fields(tableName, ['id']), [id], function (error, results) {
                        callback(connection, res, error, results);
                    });
                }
            });
        });
    },
    delete_by_id: function (req, res) {
        const reqField = trimUtil.trimPathFrom2Str(req.path);
        const tableName = reqField[0];
        const id = parseInt(reqField[1]);
        pool.getConnection(function (err, connection) {
            connection.execute(deleteSql.delete_by_id(tableName), [id], function (error, results) {
                callback(connection, res, error, results);
            });
        });
    }
};