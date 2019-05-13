module.exports = {
    delete_by_id : function (tableName){
        const sql = 'delete from '+tableName+' where id = ?';
        return sql;
    }
};