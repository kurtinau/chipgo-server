module.exports = {
    find_all: function (tableName) {
        return 'select * from ' + tableName;
    },

    find_by_fields: function (tableName, fields) {
        let fieldName = '';
        fields.map((ele) => {
            fieldName = fieldName + ele + ' = ? and ';
        });
        const index = fieldName.lastIndexOf('?');
        fieldName = fieldName.substr(0, index + 1);
        const sql = ('select * from ' + tableName + ' where ' + fieldName).trim();
        console.log(sql);
        return sql;
    },
    select_last_insert_id: function () {
        return 'SELECT LAST_INSERT_ID();';
    }
};