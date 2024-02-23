const sqlConnection = require('./sqlConnection')

// => "tabName_Col" should be in "user.task(task_name,completed)"
// => "ValuesArray" should be in "[task_name,completed]"
const insertFunction = async(tabName_Col, ValuesArray, callback) => {
    
    let db = await sqlConnection()
    let query = `INSERT INTO ${tabName_Col} VALUES (?)`
    db.query(query, [ValuesArray], (err, data) => {
        if (err) {
            callback("error")
            console.log(err)
        }
        callback("success");
    })
}

const findFunction = (query,tab_Col)=>{
    let db = sqlConnection()
    db.query(query,tab_Col,(err,data)=>{
        if(err){
            console.log(err)
        }else{
            console.log(data)
        }
    })
}


module.exports = {insertFunction,findFunction}