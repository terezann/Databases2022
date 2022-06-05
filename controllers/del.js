const { pool } = require('../utils/database');

function delete_executive(req, res,json_object,table_name){

    pool.getConnection((err, conn) => {
        var sqlQuery = `delete from executive where executive_id = ?`;

        conn.promise().query(sqlQuery, [json_object.executive_id])
        .then(() => {
            pool.releaseConnection(conn);
            req.flash('messages', { type: 'success', value: "Successfully deleted one "+table_name+"!" })
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
            req.flash('messages', { type: 'success', value: "Successfully deleted a "+table_name+" relationship !" })
            res.redirect('/');
        })
        .catch(err => {
            req.flash('messages', { type: 'error', value: "Something went wrong, " +table_name+" could not be deleted." })
            res.redirect('/');
        })
    })

}

function delete_organizationn(req, res,json_object,table_name){

    pool.getConnection((err, conn) => {
        var sqlQuery = `delete from organizationn where organizationn_id = ?`;

        conn.promise().query(sqlQuery, [json_object.organizationn_id])
        .then(() => {
            pool.releaseConnection(conn);
            req.flash('messages', { type: 'success', value: "Successfully deleted one "+table_name+"!" })
            res.redirect('/');
        })
        .catch(err => {
            req.flash('messages', { type: 'error', value: "Something went wrong, " +table_name+" could not be deleted." })
            res.redirect('/');
        })
    })

}
function delete_phones(req, res,json_object,table_name){

    pool.getConnection((err, conn) => {
        var sqlQuery = `delete from phones where phone = ? and organizationn_id = ?`;

        conn.promise().query(sqlQuery, [json_object.phone ,json_object.organizationn_id])
        .then(() => {
            pool.releaseConnection(conn);
            req.flash('messages', { type: 'success', value: "Successfully deleted one of the "+table_name+"!" })
            res.redirect('/');
        })
        .catch(err => {
            req.flash('messages', { type: 'error', value: "Something went wrong, " +table_name+" could not be deleted." })
            res.redirect('/');
        })
    })

}

function delete_evaluation(req, res,json_object,table_name){

    pool.getConnection((err, conn) => {
        var sqlQuery = `delete from evaluation where evaluation_id = ?`;

        conn.promise().query(sqlQuery, [json_object.evaluation_id])
        .then(() => {
            pool.releaseConnection(conn);
            req.flash('messages', { type: 'success', value: "Successfully deleted an "+table_name+"!" })
            res.redirect('/');
        })
        .catch(err => {
            req.flash('messages', { type: 'error', value: "Something went wrong, " +table_name+" could not be deleted." })
            res.redirect('/');
        })
    })

}
function delete_researcher(req, res,json_object,table_name){

    pool.getConnection((err, conn) => {
        var sqlQuery = `delete from researcher where researcher_id = ?`;

        conn.promise().query(sqlQuery, [json_object.researcher_id])
        .then(() => {
            pool.releaseConnection(conn);
            req.flash('messages', { type: 'success', value: "Successfully deleted a "+table_name+"!" })
            res.redirect('/');
        })
        .catch(err => {
            req.flash('messages', { type: 'error', value: "Something went wrong, " +table_name+" could not be deleted." })
            res.redirect('/');
        })
    })

}
function delete_program(req, res,json_object,table_name){

    pool.getConnection((err, conn) => {
        var sqlQuery = `delete from program where program_id = ?`;

        conn.promise().query(sqlQuery, [json_object.program_id])
        .then(() => {
            pool.releaseConnection(conn);
            req.flash('messages', { type: 'success', value: "Successfully deleted a "+table_name+"!" })
            res.redirect('/');
        })
        .catch(err => {
            req.flash('messages', { type: 'error', value: "Something went wrong, " +table_name+" could not be deleted." })
            res.redirect('/');
        })
    })

}

function delete_deliverable(req, res,json_object,table_name){

    pool.getConnection((err, conn) => {
        var sqlQuery = `delete from deliverable where title = ?`;

        conn.promise().query(sqlQuery, [json_object.title])
        .then(() => {
            pool.releaseConnection(conn);
            req.flash('messages', { type: 'success', value: "Successfully deleted a "+table_name+"!" })
            res.redirect('/');
        })
        .catch(err => {
            req.flash('messages', { type: 'error', value: "Something went wrong, " +table_name+" could not be deleted." })
            res.redirect('/');
        })
    })

}

function delete_relates(req, res,json_object,table_name){

    pool.getConnection((err, conn) => {
        var sqlQuery = `delete from relates where scientific_field_name = ? and project_id = ?`;

        conn.promise().query(sqlQuery, [json_object.scientific_field_name, json_object.project_id])
        .then(() => {
            pool.releaseConnection(conn);
            req.flash('messages', { type: 'success', value: "Successfully deleted a "+table_name+"!" })
            res.redirect('/');
        })
        .catch(err => {
            req.flash('messages', { type: 'error', value: "Something went wrong, " +table_name+" could not be deleted." })
            res.redirect('/');
        })
    })

}
function delete_scientific_field(req, res,json_object,table_name){

    pool.getConnection((err, conn) => {
        var sqlQuery = `delete from scientific_field where scientific_field_name = ?`;

        conn.promise().query(sqlQuery, [json_object.scientific_field_name])
        .then(() => {
            pool.releaseConnection(conn);
            req.flash('messages', { type: 'success', value: "Successfully deleted the Sci_field"+table_name+"!" })
            res.redirect('/');
        })
        .catch(err => {
            req.flash('messages', { type: 'error', value: "Something went wrong, " +table_name+" could not be deleted." })
            res.redirect('/');
        })
    })

}

function delete_project(req, res,json_object,table_name){

    pool.getConnection((err, conn) => {
        var sqlQuery = `delete from project where project_id = ?`;

        conn.promise().query(sqlQuery, [json_object.project_id])
        .then(() => {
            pool.releaseConnection(conn);
            req.flash('messages', { type: 'success', value: "Successfully deleted a "+table_name+"!" })
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

    if (table_name == 'executive'){ 
        delete_executive(req,res,json_object,table_name)
    }

    else if (table_name == 'worksatproject'){ 
        delete_worksatproject(req,res,json_object,table_name)
    }
    else if (table_name == 'organizationn'){ 
        delete_organizationn(req,res,json_object,table_name)
    }
    else if (table_name == 'phones'){ 
        delete_phones(req,res,json_object,table_name)
    }
    else if (table_name == 'evaluation'){ 
        delete_evaluation(req,res,json_object,table_name)
    }
    else if (table_name == 'researcher'){ 
        delete_researcher(req,res,json_object,table_name)
    }
    else if (table_name == 'program'){ 
        delete_program(req,res,json_object,table_name)
    }
    else if (table_name == 'deliverable'){ 
        delete_deliverable(req,res,json_object,table_name)
    }
    else if (table_name == 'relates'){ 
        delete_relates(req,res,json_object,table_name)
    }
    else if (table_name == 'scientific_field'){ 
        delete_scientific_field(req,res,json_object,table_name)
    }
    else
        delete_project(req,res,json_object,table_name)
    
   
}

