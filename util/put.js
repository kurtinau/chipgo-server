module.exports = {
    update_by_fields_and : function (tableName, columns, conditionNum){
        let sql = 'update ' + tableName + ' set ';
        const conditionIndex = columns.length-conditionNum;
        for(let i=0; i<conditionIndex; i++){
            sql+= columns[i] + '=?';
            if(i !== conditionIndex-1)
                sql+=', ';
        }
        sql+=' where ';
        for(let i=conditionIndex; i< columns.length; i++){
            sql+=columns[i] + '=?';
            if(i !== columns.length-1)
                sql+=' and ';
        }
        sql+=';';
        console.log(sql);
        return sql;
    }
};