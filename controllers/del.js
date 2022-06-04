const { pool } = require('../utils/database');

function delete_executive(req, res,json_object,table_name){

    pool.getConnection((err, conn) => {
        var sqlQuery = `delete from executive where executive_id = ?`;

        conn.promise().query(sqlQuery, [json_object.executive_id])
        .then(() => {
            pool.releaseConnection(conn);
            req.flash('messages', { type: 'success', value: "Successfully deleted a new "+table_name+"!" })
            res.redirect('/');
        })
        .catch(err => {
            req.flash('messages', { type: 'error', value: "Something went wrong, " +table_name+" could not be deleted." })
            res.redirect('/');
        })
    })

}

function delete_worksatproject(req, res,json_object,table_name){

    pool.getConnection((err, conn) => {
        var sqlQuery = `delete from worksatproject where researcher_id = ? and project_id = ?`;

        conn.promise().query(sqlQuery, [json_object.researcher_id, json_object.project_id])
        .then(() => {
            pool.releaseConnection(conn);
            req.flash('messages', { type: 'success', value: "Successfully deleted a new "+table_name+"!" })
            res.redirect('/');
        })
        .catch(err => {
            req.flash('messages', { type: 'error', value: "Something went wrong, " +table_name+" could not be deleted." })
            res.redirect('/');
        })
    })

}

exports.postDel = (req, res, next) => {

    var table_name = req.body.table;
    var json_string = req.body.object;
    var json_object = JSON.parse(json_string) // json_object is like a tuple !
    
    console.log(table_name);
    console.log(json_object);

    if (table_name == 'executive'){ //auto gia ola
        delete_executive(req,res,json_object,table_name)
    }

    else if (table_name == 'worksatproject'){ //auto gia ola
        delete_worksatproject(req,res,json_object,table_name)
    }
   
}

