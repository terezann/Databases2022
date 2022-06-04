const { pool } = require('../utils/database');              //We define pool from ../utils/database

exports.getSci_fieldWithInterest = (req, res, next) => {
    
    res.render('sci_with_int.ejs', {
        pageTitle: "QUERY 3",
    })
}

exports.getTop3 = (req, res, next) => {

    
   pool.getConnection((err, conn) => {
        if(err){
            console.log(err);
        }
        conn.promise().query("SELECT r1.sc1, r1.sc2, COUNT(*) AS cc " + 
                            "FROM( " +
                            "SELECT " +
                            "rel1.scientific_field_name AS sc1, rel2.scientific_field_name AS sc2 " +
                            "FROM " +
                            "Relates rel1 " +
                            "INNER JOIN Relates rel2 ON rel1.project_id = rel2.project_id " +
                            "WHERE " +
                            "rel1.scientific_field_name > rel2.scientific_field_name " +
                            ") r1 " +
                            "GROUP BY r1.sc1, r1.sc2 " +
                            "ORDER BY cc DESC " +			
                            "LIMIT 3 " )					
                            
        .then(([rows, fields]) => {
            res.render('project_top3.ejs', {
                pageTitle: "QUERY 3.5",
                query_res: rows,
                //messages: messages
            })
            //resolve();
        })
        .then(() => pool.releaseConnection(conn))
        .catch(err => console.log(err))
    
    
    })
 }
 

exports.postSci_fieldWithInterest = (req, res, next) => {
    
    const sci_name = req.body.sci_name;
   
   console.log(sci_name)
   /* 
    SELECT
	smth.scientific_field_name, smth.project_id, smth.title, smth2.researcher_id
FROM
	(
	(
	SELECT ij1.project_id, ij1.title, ij2.scientific_field_name 
    FROM
	(
	SELECT p.project_id, p.title
    FROM Project p
	WHERE DATEDIFF(end_date, CURRENT_DATE()) > 0 AND DATEDIFF(start_date, CURRENT_DATE()) < 0 		
	) AS ij1		
	INNER JOIN
    (
    SELECT rel.scientific_field_name, rel.project_id
    FROM Relates rel
    WHERE rel.scientific_field_name = 'Mathematics'
    ) AS ij2		
    ON ij1.project_id = ij2.project_id
    ) AS smth		
    LEFT OUTER JOIN WorksAtProject wap ON smth.project_id = wap.project_id
    LEFT OUTER JOIN 
    (
    SELECT r.researcher_id
    FROM Researcher r 
    WHERE YEAR(r.work_starting_date) = YEAR(CURRENT_DATE())
    ) AS smth2
    ON wap.researcher_id = smth2.researcher_id
    )

     

   
   */
   
   var sql =   
   "SELECT "+
   "smth.scientific_field_name, smth.project_id, smth.title, smth2.researcher_id "+
"FROM "+
   "( "+
   "( "+
   "SELECT ij1.project_id, ij1.title, ij2.scientific_field_name "+ 
   "FROM "+
   "( "+
   "SELECT p.project_id, p.title "+
   "FROM Project p "+
   "WHERE DATEDIFF(end_date, CURRENT_DATE()) > 0 AND DATEDIFF(start_date, CURRENT_DATE()) < 0 "+
   ") AS ij1 "+
   "INNER JOIN "+
   "( "+
   "SELECT rel.scientific_field_name, rel.project_id "+
   "FROM Relates rel "+
   "WHERE rel.scientific_field_name = '"+ sci_name+"' " +
   ") AS ij2 "+
   "ON ij1.project_id = ij2.project_id "+
   ") AS smth "+
   "LEFT OUTER JOIN WorksAtProject wap ON smth.project_id = wap.project_id "+
   "LEFT OUTER JOIN "+
   "( "+
   "SELECT r.researcher_id "+
   "FROM Researcher r "+ 
   "WHERE YEAR(r.work_starting_date) = YEAR(CURRENT_DATE()) "+
   ") AS smth2 "+
   "ON wap.researcher_id = smth2.researcher_id "+
   ")" 	
 
    /*We go to the database*/
    pool.getConnection((err, conn) => {
        if(err){
            console.log(err);
        }
        // a promise can succeed or fail.
        conn.promise().query(sql)
        .then(([rows, fields]) => {
            res.render('sci_with_int.ejs', {
                pageTitle: "QUERY 3",
                query_res: rows
                //messages: messages
            })
            //resolve();
        })
        .then(() => pool.releaseConnection(conn))
        .catch(err => console.log(err))
    });

}



