const pool = require('../config/database');
const myglobal = require('../config/global');

module.exports = {
    check_table_list: function () {
        pool.getConnection(function (err, connection) {
            connection.execute('show tables', function (error, results, fields) {
                if (error) {
                    console.log(error);
                } else {
                    let keys = Object.keys(results[0]);
                    for (let ele in results) {
                        let name = results[ele][keys[0]];
                        myglobal.table_list.names.push(name);
                        myglobal.table_list.size++;
                    }
                }
            });
            pool.releaseConnection(connection);
        });

    },
};