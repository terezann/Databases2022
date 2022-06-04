const { pool } = require('../utils/database');              //We define pool from ../utils/database

exports.getOrganization4 = (req, res, next) => {
    
    pool.getConnection((err, conn) => {
        if(err){
            console.log(err);
        }
        // a promise can succeed or fail.
        conn.promise().query("select distinct poy1.organizationn_id, poy1.organization_name " + 
        "from prs_for_orgs_per_year poy1 " + 
        "inner join " + 
        "prs_for_orgs_per_year poy2 ON poy1.organizationn_id = poy2.organizationn_id " +
        "WHERE (ABS(poy1.yearr - poy2.yearr) = 1 AND poy1.cc = poy2.cc AND poy1.cc > 10)")
        .then(([rows, fields]) => {
            res.render('OrgSameprojects_2years.ejs', {
                pageTitle: "Organizations with the same amount of projects in 2 consecutive years (At least 10 projects per year).",
                query_res: rows,
                //messages: messages
            })
            //resolve();
        })
        .then(() => pool.releaseConnection(conn))
        .catch(err => console.log(err))
    }); 


}
