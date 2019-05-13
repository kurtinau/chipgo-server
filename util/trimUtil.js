module.exports = {
    trim2tableName : function (path) {
        return path.substring(1);
    },
    trimPathFrom2Str : function (path) {
        let newPath = path.substring(1);
        let position = newPath.indexOf('/');
        let tableName = newPath.substring(0,position);
        let paras = newPath.substring(position+1);
        // console.log(tableName+' '+paras);
        var reqField = [];
        reqField.push(tableName);
        reqField.push(paras);
        return reqField;
    }
};