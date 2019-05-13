module.exports = {
    insert_into: function (tableName, fields) {
        let sql = 'insert into ' + tableName + ' (';
        fields.map((field, index) => {
            sql += field;
            if(index !== fields.length-1){
                sql += ',';
            }
        });
        sql += ') values (';
        fields.map((field,index) => {
            sql += '?';
            if(index !== fields.length-1){
                sql += ',';
            }
        });
        sql += ')';
        console.log(sql);
        return sql;
    }
};