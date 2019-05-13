const myGlobal = require('../config/global');
module.exports = {
    check_table_exist : function (path) {
        return myGlobal.table_list.names.includes(path);
    }
};