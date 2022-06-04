const { pool } = require('../utils/database');              //We define pool from ../utils/database

exports.getExec = (req, res, next) => {
    
    pool.getConnection((err, conn) => {
        if(err){
            console.log(err);
        }
        conn.promise().query("SELECT " + 
                            "ex.executive_name, org.organization_name, SUM(p.amount) AS Total_Funding_Amount " +
                            "FROM " +
                            "Executive ex " + 
                            "INNER JOIN Project p ON ex.executive_id = p.executive_id " +
                            "INNER JOIN " +
                            "(SELECT org0.organizationn_id, org0.organization_name " +
                            "FROM Organizationn org0 " +
                            "WHERE org0.company_budget IS NOT NULL " +
                            ") AS org " +	
                            "ON p.organizationn_id = org.organizationn_id " +
                            "GROUP BY ex.executive_id, org.organizationn_id " +
                            "ORDER BY Total_Funding_Amount DESC " +
                            "LIMIT 3")
            .then(([rows, fields]) => {
            res.render('exec_top.ejs', {
                pageTitle: "QUERY 3.7",
                query_res: rows,
           
             })
        })
        .then(() => pool.releaseConnection(conn))
        .catch(err => console.log(err))
    });
}



