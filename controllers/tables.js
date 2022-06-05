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
            query_res = rows;       //query_res = is a table ! 
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

function insertExecutive(req,res) {
    res.render('Insertions_Updates/exec.ejs', {
        pageTitle: "Executive Insertion",
        insert: true
    });
 }
 
function insertEvaluation(req,res) {
    res.render('Insertions_Updates/eval.ejs', {
        pageTitle: "Evaluation Insertion",
        insert: true
    });
 }  

 function insertOrganization(req,res) {
    res.render('Insertions_Updates/org.ejs', {
        pageTitle: "Organization Insertion",
        insert: true
    });
 } 

 function insertPhones(req,res) {
    res.render('Insertions_Updates/phones.ejs', {
        pageTitle: "Phone Insertion",
        insert: true
    });
 } 

 function insertProgram(req,res) {
    res.render('Insertions_Updates/prog.ejs', {
        pageTitle: "Program Insertion",
        insert: true
    });
 } 

 function insertProject(req,res) {
    res.render('Insertions_Updates/proJ.ejs', {
        pageTitle: "Project Insertion",
        insert: true
    });
    //res.send('Insert Project');
 } 
 
 function insertResearcher(req,res) {
    res.render('Insertions_Updates/resea.ejs', {
        pageTitle: "Researcher Insertion",
        insert: true
    });
 }

 function insertRelates(req,res) {
    res.render('Insertions_Updates/rela.ejs', {
        pageTitle: "Relation Insertion",
        insert: true
    });
 }

 function insertWork(req,res) {
    res.render('Insertions_Updates/wap.ejs', {
        pageTitle: "Work Insertion",
        insert: true
    });
 }

 function insertSF(req,res) {
    res.render('Insertions_Updates/sf.ejs', {
        pageTitle: "Scientific Field Insertion",
        insert: true
    });
 }

exports.getInsert = (req, res, next) => {

    if (req.params.table_name == 'executive'){
        insertExecutive(req,res)
    }
    else if (req.params.table_name == 'evaluation'){
        insertEvaluation(req,res)
    }
    else if (req.params.table_name == 'organizationn'){
        insertOrganization(req,res)
    }
    else if (req.params.table_name == 'phones'){
        insertPhones(req,res)
    }
    else if (req.params.table_name == 'program'){
        insertProgram(req,res)
    }
    else if (req.params.table_name == 'project'){
        insertProject(req,res)
    }
    else if (req.params.table_name == 'researcher'){
        insertResearcher(req,res)
    }
    else if (req.params.table_name == 'relates'){
        insertRelates(req,res)
    }
    else if (req.params.table_name == 'worksatproject'){
        insertWork(req,res)
    }
    else if (req.params.table_name == 'scientific_field'){
        insertSF(req,res)
    }
}

exports.postInsert = (req, res, next) => {
    // ############## EXECUTIVE ##################

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

        // ############## EVALUATION ##################
    } 
    else if (req.params.table_name == 'evaluation'){
        const grade = req.body.eval_grade;
        const date = req.body.eval_date;
        var sql = `insert into evaluation (grade, evaluation_date) values (?, ?);`
        pool.getConnection((err, conn) => {
            if(err){
                console.log(err);
            }
            // a promise can succeed or fail.
            conn.promise().query(sql, [grade, date])
            .then(() => {
                               
                pool.releaseConnection(conn);
                req.flash('messages', { type: 'success', value: "Successfully added a new Evalutation!" })
                res.redirect('/');
            })
            .catch(err => {
                req.flash('messages', { type: 'error', value: "Something went wrong, Evaluation could not be added." })
                res.redirect('/');
            })
        });


        // ############## ORGANIZATION ##################
    }
    else if (req.params.table_name == 'organizationn'){
        const name = req.body.org_name;
        const abb = req.body.org_abb;
        const pcode = req.body.org_code;
        const street = req.body.org_str;
        const number = req.body.org_num;
        const city = req.body.org_city;
        const comp_b = req.body.org_comp_b;
        const uni_b = req.body.org_uni_b;
        const res_b = req.body.org_res_b;

        var sql = `insert into organizationn (organization_name, abbreviation, postal_code, street, numberr, city, company_budget, university_budget, research_center_budget) values (?,?,?,?,?,?,?,?,?);`
        pool.getConnection((err, conn) => {
            if(err){
                console.log(err);
            }
            // a promise can succeed or fail.
            conn.promise().query(sql, [name, abb, pcode, street, number, city, comp_b, uni_b, res_b])
            .then(() => {
                               
                pool.releaseConnection(conn);
                req.flash('messages', { type: 'success', value: "Successfully added a new Organization!" })
                res.redirect('/');
            })
            .catch(err => {
                req.flash('messages', { type: 'error', value: "Something went wrong, Organization could not be added." })
                res.redirect('/');
            })
        });
    }

    // ############## PHONES ##################
    else if (req.params.table_name == 'phones'){
        const phone = req.body.pho;
        const idd = req.body.id;

        var sql = `insert into phones (phone, organizationn_id) values (?,?);`
        pool.getConnection((err, conn) => {
            if(err){
                console.log(err);
            }
            // a promise can succeed or fail.
            conn.promise().query(sql, [phone, idd])
            .then(() => {
                               
                pool.releaseConnection(conn);
                req.flash('messages', { type: 'success', value: "Successfully added a new Phone!" })
                res.redirect('/');
            })
            .catch(err => {
                req.flash('messages', { type: 'error', value: "Something went wrong, Phone could not be added." })
                res.redirect('/');
            })
        });
    }

    // ############## PROGRAMS ##################
    else if (req.params.table_name == 'program'){
        const name = req.body.pro_name;
        const add = req.body.pro_add;

        var sql = `insert into program (program_name, address) values (?,?);`
        pool.getConnection((err, conn) => {
            if(err){
                console.log(err);
            }
            // a promise can succeed or fail.
            conn.promise().query(sql, [name, add])
            .then(() => {
                               
                pool.releaseConnection(conn);
                req.flash('messages', { type: 'success', value: "Successfully added a new Program!" })
                res.redirect('/');
            })
            .catch(err => {
                req.flash('messages', { type: 'error', value: "Something went wrong, Program could not be added." })
                res.redirect('/');
            })
        });
    }

    // ############## PROJECTS ##################
    else if (req.params.table_name == 'project'){
        const title = req.body.pro_tit;
        const summary = req.body.pro_sum;
        const Sdate = req.body.pro_Sdate;
        const Edate = req.body.pro_Edate;
        const amount = req.body.pro_am;
        const OrgId = req.body.pro_org_id;
        const ExeId = req.body.pro_exe_id;
        const ProgId = req.body.pro_pro_id;
        const EvaId = req.body.pro_eva_id;
        const EvaluatorId = req.body.pro_evaluator;
        const ChiefId = req.body.pro_chief;

        var sql = `insert into project (title, summary, start_date, end_date, amount, organizationn_id, executive_id, program_id, evaluation_id, evaluator_id, chief_id) values (?,?,?,?,?,?,?,?,?,?,?);`
        pool.getConnection((err, conn) => {
            if(err){
                console.log(err);
            }
            // a promise can succeed or fail.
            conn.promise().query(sql, [title, summary, Sdate, Edate, amount, OrgId, ExeId, ProgId, EvaId, EvaluatorId, ChiefId])
            .then(() => {
                               
                pool.releaseConnection(conn);
                req.flash('messages', { type: 'success', value: "Successfully added a new Project!" })
                res.redirect('/');
            })
            .catch(err => {
                
                req.flash('messages', { type: 'error', value: "Something went wrong, Project could not be added." })
                res.redirect('/');
                
            })
        });
    }
    

    // ############## RESEARCHERS ##################
    else if (req.params.table_name == 'researcher'){
        const name = req.body.re_name;
        const sur = req.body.re_sname;
        const Sex = req.body.sex;
        const birthdate = req.body.Bdate;
        const workstartingdate = req.body.WSdate;
        const title = req.body.org;
        

        var sql = `insert into researcher (researcher_name, researcher_surname, sex, birth_date, work_starting_date, organizationn_id) values (?,?,?,?,?,?);`
        pool.getConnection((err, conn) => {
            if(err){
                console.log(err);
            }
            // a promise can succeed or fail.
            conn.promise().query(sql, [name, sur, Sex, birthdate, workstartingdate, title])
            .then(() => {
                               
                pool.releaseConnection(conn);
                req.flash('messages', { type: 'success', value: "Successfully added a new Researcher!" })
                res.redirect('/');
            })
            .catch(err => {
                req.flash('messages', { type: 'error', value: "Something went wrong, Researcher could not be added." })
                res.redirect('/');
            })
        });
    }


    // ############## RELATES ##################
    else if (req.params.table_name == 'relates'){
        const sci = req.body.sf;
        const Pid = req.body.prid;
        

        var sql = `insert into relates (scientific_field_name, project_id) values (?,?);`
        pool.getConnection((err, conn) => {
            if(err){
                console.log(err);
            }
            // a promise can succeed or fail.
            conn.promise().query(sql, [sci, Pid])
            .then(() => {
                               
                pool.releaseConnection(conn);
                req.flash('messages', { type: 'success', value: "Successfully added a new Relation!" })
                res.redirect('/');
            })
            .catch(err => {
                req.flash('messages', { type: 'error', value: "Something went wrong, Relation could not be added." })
                res.redirect('/');
            })
        });
    }


    // ############## WORKS AT PROJECT ##################
    else if (req.params.table_name == 'worksatproject'){
        const rese = req.body.rid;
        const Proid = req.body.Prid;
        

        var sql = `insert into worksatproject (researcher_id, project_id) values (?,?);`
        pool.getConnection((err, conn) => {
            if(err){
                console.log(err);
            }
            // a promise can succeed or fail.
            conn.promise().query(sql, [rese, Proid])
            .then(() => {
                               
                pool.releaseConnection(conn);
                req.flash('messages', { type: 'success', value: "Successfully added a new Work Relation!" })
                res.redirect('/');
            })
            .catch(err => {
                req.flash('messages', { type: 'error', value: "Something went wrong, Work Relation could not be added." })
                res.redirect('/');
            })
        });
    }


    // ############## SCIENTIFIC FIELD ##################
    else if (req.params.table_name == 'scientific_field'){
        const sfname = req.body.sfN;
        

        var sql = `insert into scientific_field (scientific_field_name) values (?);`
        pool.getConnection((err, conn) => {
            if(err){
                console.log(err);
            }
            // a promise can succeed or fail.
            conn.promise().query(sql, [sfname])
            .then(() => {
                               
                pool.releaseConnection(conn);
                req.flash('messages', { type: 'success', value: "Successfully added a new Scientific Field!" })
                res.redirect('/');
            })
            .catch(err => {
                req.flash('messages', { type: 'error', value: "Something went wrong, Scientic Field could not be added." })
                res.redirect('/');
            })
        });
    }
}
