const { pool } = require('../utils/database');

function update_executive(req, res,old_json_object,table_name){
    
    var new_exec_name = req.body.exec_name // req.body... takes the inputs of the form !

   
    pool.getConnection((err, conn) => {
        var sqlQuery = `update executive set executive_name=? where executive_id = ?`;

        conn.promise().query(sqlQuery, [new_exec_name, old_json_object.executive_id])
        .then(() => {
            pool.releaseConnection(conn);
            req.flash('messages', { type: 'success', value: "Successfully updated "+table_name+"!" })
            res.redirect('/');
        })
        .catch(err => {
            req.flash('messages', { type: 'error', value: "Something went wrong, " +table_name+" could not be updated." })
            res.redirect('/');
        })
    })

}


exports.perform_update = (req, res, next) => {
    var table_name = req.body.table;

    var json_string = req.body.object;
    var old_json_object = JSON.parse(json_string) // json_object is like a tuple !
    

    if (table_name == 'executive'){ //auto gia ola
        update_executive(req,res,old_json_object,table_name)
    }

    
   
}

// just show the update form in the instrtion ejs files
exports.showForm = (req,res) =>{
    var table_name = req.body.table;
    var json_string = req.body.object;
    var json_object = JSON.parse(json_string) // json_object is like a tuple !

    if (table_name == 'executive'){
        res.render('insertion/exec.ejs',{
            update: true,
            old_tuple : json_object, 
            pageTitle: 'Update Executive'
        });
    }
}

