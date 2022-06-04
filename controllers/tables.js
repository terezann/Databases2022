const { query } = require('express');
const { type } = require('express/lib/response');
const { pool } = require('../utils/database');              //We define pool from ../utils/database

exports.getTables = (req, res, next) => {

    pool.getConnection((err, conn) => {
        if(err){
            console.log(err);
        }
        conn.promise().query("show full tables where Table_Type = 'BASE TABLE';")
                            
        .then(([rows, fields]) => {
            res.render('tables.ejs', {
                pageTitle: "Tables",
                query_res: rows,
            })
            //resolve(); 
        })
        .then(() => pool.releaseConnection(conn))
        .catch(err => console.log(err))
    })
}

exports.getData = (req, res, next) => {
    var query_res;
    pool.getConnection((err, conn) => {
        if(err){
            console.log(err);
        }
       
        conn.promise().query(`select * from ${req.params.Tables_in_elidek} `) //req.params.Tables_in_elidek = the selected table !!
        .then(([rows, fields]) => {
            query_res = rows;
            // res.render('data.ejs', {
            //     pageTitle: "Tuples",
            //     query_res: rows
            //     //messages: messages
            // })
            //resolve();
        })
        .then(() => pool.releaseConnection(conn))
        .catch(err => console.log(err))
    
    
    });
    //console.log(query_res)
    pool.getConnection((err, conn) => {
        if(err){
            console.log(err);
        }
        
        conn.promise().query(`SHOW COLUMNS FROM ${req.params.Tables_in_elidek}`)
        .then(([rows, fields]) => {
            
            //res.send({cols:rows[1].Field,vals:query_res});
            
            res.render('data.ejs', {
                pageTitle: "Tuples",
                query_res: query_res,
                col_names: rows,
                table_name: req.params.Tables_in_elidek
                //messages: messages
            })
            //console.log(rows)
        })
        .then(() => pool.releaseConnection(conn))
        .catch(err => console.log(err))
    
    
    });
    
}



