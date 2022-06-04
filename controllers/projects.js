const { pool } = require('../utils/database');              //We define pool from ../utils/database

exports.getTop = (req, res, next) => {
    pool.getConnection((err, conn) => {
        if(err){
            console.log(err);
        }
        // a promise can succeed or fail.
        conn.promise().query("SELECT " +
        "smth.researcher_id, COUNT(smth.project_id) AS Number_Of_Active_Projects " +
        "FROM " +
        "( " +
        "SELECT r1.researcher_id, wap.project_id " +
        "FROM " +
        "( " +
        "( " +
        "SELECT r1.researcher_id " +
        "FROM Researcher r1 " +
        "WHERE TIMESTAMPDIFF(YEAR, r1.birth_date, CURDATE()) < 40 " +
        ") AS r1 " +
        "INNER JOIN WorksAtProject wap ON r1.researcher_id = wap.researcher_id " +
        "INNER JOIN " +
        "( " +
        "SELECT p.project_id " +
        "FROM Project p " +
        "WHERE DATEDIFF(p.end_date, CURRENT_DATE()) > 0 AND " +
        "DATEDIFF(start_date, CURRENT_DATE()) < 0 " +
        ") p1 " + 
        "ON wap.project_id = p1.project_id " +
        ") " +
        ") AS smth " +
        "GROUP BY smth.researcher_id " +
        "ORDER BY Number_Of_Active_Projects DESC"
    )
        .then(([rows, fields]) => {
            res.render('young_researchers.ejs', {
                pageTitle: "QUERY 3.6",
                query_res: rows,
                //messages: messages
            })
            //resolve();
        })
        .then(() => pool.releaseConnection(conn))
        .catch(err => console.log(err))
    });
}
exports.getRes = (req, res, next) => {
    pool.getConnection((err, conn) => {
        if(err){
            console.log(err);
        }
        // a promise can succeed or fail.
        conn.promise().query(
        "SELECT * " +
        "FROM " +
        "( SELECT wap.researcher_id, COUNT(out1.project_id) AS Number_of_Valid_Projects " +
        "FROM(( " +
        "SELECT p.project_id " +
            "FROM Project p " +
            "WHERE 	DATEDIFF(p.end_date, CURRENT_DATE) > 0 AND " +
            "DATEDIFF(p.start_date, CURRENT_DATE) < 0 " + 
                    "EXCEPT " +
            "SELECT d.project_id " +
            "FROM Deliverable d " +
            ") AS out1 " +
            "INNER JOIN WorksAtProject wap ON out1.project_id = wap.project_id " +    
            ") " +
        "GROUP BY wap.researcher_id " +
        ") AS r " +
        "WHERE r.Number_of_Valid_Projects > 4 ") 
        .then(([rows, fields]) => {
            res.render('query3_8.ejs', {
                pageTitle: "Query 3.8",
                query_res: rows,
            })
       })
        .then(() => pool.releaseConnection(conn))
        .catch(err => console.log(err))
    });


}

exports.getPorjectsByResearcher = (req, res, next) => {
    pool.getConnection((err, conn) => {
        if(err){
            console.log(err);
        }
        // a promise can succeed or fail.
        conn.promise().query("select * from project_by_researchers")
        .then(([rows, fields]) => {
            res.render('researchers.ejs', {
                pageTitle: "Researchers Page",
                query_res: rows,
                //messages: messages
            })
            //resolve();
        })
        .then(() => pool.releaseConnection(conn))
        .catch(err => console.log(err))
    });


}


exports.getPorjectsByExecutive = (req, res, next) => {
    pool.getConnection((err, conn) => {
        if(err){
            console.log(err);
        }
        // a promise can succeed or fail.
        conn.promise().query("select * from projects_by_exec")
        .then(([rows, fields]) => {
            res.render('executives.ejs', {
                pageTitle: "Executives Page",
                query_res: rows,
                //messages: messages
            })
            //resolve();
        })
        .then(() => pool.releaseConnection(conn))
        .catch(err => console.log(err))
    });
}
    
exports.getResearchers = (req, res, next) => {
    pool.getConnection((err, conn) => {
        if(err){
            console.log(err);
        }
        conn.promise().query(`select  w.researcher_id , r.researcher_name `+
        `from worksatproject w join researcher r on r.researcher_id = w.researcher_id `+
        `where w.project_id = ${req.params.project_id} `)
        .then(([rows, fields]) => {
            res.render('project_researchers.ejs', {
                pageTitle: "Researchers of the Project",
                query_res: rows,
                //messages: messages
            })
            //resolve();
        })
        .then(() => pool.releaseConnection(conn))
        .catch(err => console.log(err))
    
    
    });
}

