const { type } = require('express/lib/response');
const { pool } = require('../utils/database');              //We define pool from ../utils/database

exports.getProgramsByCriteria = (req, res, next) => {
    
    res.render('programs_by_criteria.ejs', {
        pageTitle: "QUERY 1",
    })
}

/*From sumbit we come here, cause sumbit sends a post req*/
exports.postProgramsByCriteria = (req, res, next) => {
    const date = req.body.date;
    const duration = req.body.duration;
    const exec_id = req.body.exec_id;

    /*
    select program.program_id ,program.program_name , p.project_id, p.title
    from program join project p
    on program.program_id = p.program_id
    where 
        '2021-01-01' <= p.start_date and
        duration = 3 and
        executive_id = 1
    */
    var sql="select program.program_id ,program.program_name , p.project_id, p.title "+
        "from program join project p "+
        "on program.program_id = p.program_id "+
        "where 1=1 ";

    var date_cond = "";
    
    if (date !== ''){
        
        date_cond=" and p.start_date >= '"+date +"' ";
    }

    
    var duration_cond = "";
    if (typeof duration !== 'undefined'){
        duration_cond= " and duration ="+duration
    }

    var exec_id_cond = "";
    if (exec_id !== ''){
        exec_id_cond= " and executive_id ="+exec_id
    }

    sql += (date_cond + duration_cond + exec_id_cond)

    /*We go to the database*/
    pool.getConnection((err, conn) => {
        if(err){
            console.log(err);
        }
        // a promise can succeed or fail.
        conn.promise().query(sql)
        .then(([rows, fields]) => {
            res.render('programs_by_criteria.ejs', {
                pageTitle: "QUERY 1",
                query_res: rows
            })
        })
        .then(() => pool.releaseConnection(conn))
        .catch(err => console.log(err))
    });



    
}