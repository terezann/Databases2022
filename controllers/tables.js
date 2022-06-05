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
    var query_res; // we take it from the 1st connection and we use it at the second
    
    pool.getConnection((err, conn) => {
        if(err){
            console.log(err);
        }
       
        conn.promise().query(`select * from ${req.params.Tables_in_elidek} `) 
        //req.params.Tables_in_elidek = the selected table !!
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
            //console.log(query_res[0].executive_id )
            /*
            query_res = [{exec_id:1, exec_name:gregory},
                        {exec_id:2, exec_name:tereza} ] 
                        console.log(rows[0].Field) 
            */
            
        })
        .then(() => pool.releaseConnection(conn))
        .catch(err => console.log(err))
    
    
    });
    
}

function insertExec(req,res) {
    res.render('insertion/exec.ejs', {
        pageTitle: "Executive Insertion",
        insert: true
    });
 } 

exports.getInsert = (req, res, next) => {

    if (req.params.table_name == 'executive'){
        insertExec(req,res)
    }
    
    
}

exports.postInsert = (req, res, next) => {

    if (req.params.table_name == 'executive'){
        const name = req.body.exec_name;
        var sql = `insert into Executive (executive_name) values (?);`
        pool.getConnection((err, conn) => {
            if(err){
                console.log(err);
            }
            // a promise can succeed or fail.
            conn.promise().query(sql, [name])
            .then(() => {
                               
                pool.releaseConnection(conn);
                req.flash('messages', { type: 'success', value: "Successfully added a new Executive!" })
                res.redirect('/');
            })
            .catch(err => {
                req.flash('messages', { type: 'error', value: "Something went wrong, Executive could not be added." })
                res.redirect('/');
            })
        });
    }
    
    
}
