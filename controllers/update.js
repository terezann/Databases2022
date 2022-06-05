const { pool } = require('../utils/database');

function update_executive(req, res,old_json_object,table_name){
    
    var new_exec_name = req.body.exec_name // req.body... takes the inputs of the form !

   
    pool.getConnection((err, conn) => {
        var sqlQuery = `update executive set executive_name=? where executive_id = ?`;

        conn.promise().query(sqlQuery, [new_exec_name, old_json_object.executive_id])
        .then(() => {
            pool.releaseConnection(conn);
            req.flash('messages', { type: 'success', value: "Successfully updated "+table_name+"!" })
            res.redirect('/');
        })
        .catch(err => {
            req.flash('messages', { type: 'error', value: "Something went wrong, " +table_name+" could not be updated." })
            res.redirect('/');
        })
    })

}

function update_evaluation(req, res,old_json_object,table_name){
    
    var new_eval_grade = req.body.eval_grade;  // req.body... takes the inputs of the form !
    var new_eval_date = req.body.eval_date;

   
    pool.getConnection((err, conn) => {
        var sqlQuery = `update evaluation set grade=?,evaluation_date=?   where evaluation_id = ?`;

        conn.promise().query(sqlQuery, [new_eval_grade, new_eval_date,old_json_object.evaluation_id])
        .then(() => {
            pool.releaseConnection(conn);
            req.flash('messages', { type: 'success', value: "Successfully updated "+table_name+"!" })
            res.redirect('/');
        })
        .catch(err => {
            req.flash('messages', { type: 'error', value: "Something went wrong, " +table_name+" could not be updated." })
            res.redirect('/');
        })
    })

}

function update_organization(req, res,old_json_object,table_name){
    
    var new_org_name = req.body.org_name; // req.body... takes the inputs of the form !
    var new_org_abb = req.body.org_abb;
    var new_org_code = req.body.org_code;
    var new_org_str = req.body.org_str;
    var new_org_num = req.body.org_num;
    var new_org_city = req.body.org_city;
    var new_org_comp_b = req.body.org_comp_b;
    var new_org_uni_b = req.body.org_uni_b;
    var new_org_res_b = req.body.org_res_b;

    
    
    pool.getConnection((err, conn) => {
        var sqlQuery = `update organizationn set organization_name=?, abbreviation=?, postal_code=?, street=?, numberr=?, city=?, company_budget=?, university_budget=?, research_center_budget=? where organizationn_id = ?`;
        conn.promise().query(sqlQuery, [new_org_name, new_org_abb, new_org_code, new_org_str, new_org_num, new_org_city, new_org_comp_b, new_org_uni_b, new_org_res_b, old_json_object.organizationn_id])
        .then(() => {
            pool.releaseConnection(conn);
            req.flash('messages', { type: 'success', value: "Successfully updated Organization!" })
            res.redirect('/');
        })
        .catch(err => {
            req.flash('messages', { type: 'error', value: "Something went wrong, Organization could not be updated." })
            res.redirect('/');
        })
        
    })

}

function update_phones(req, res,old_json_object,table_name){
    
    var new_pho = req.body.pho; // req.body... takes the inputs of the form !

   
    pool.getConnection((err, conn) => {
        var sqlQuery = `update phones set phone=? where (phone=? and organizationn_id=?)`;
        conn.promise().query(sqlQuery, [new_pho, old_json_object.phone, old_json_object.organizationn_id])
        .then(() => {
            pool.releaseConnection(conn);
            req.flash('messages', { type: 'success', value: "Successfully updated Phone!" })
            res.redirect('/');
        })
        .catch(err => {
            req.flash('messages', { type: 'error', value: "Something went wrong, Phone could not be updated." })
            res.redirect('/');
        })
    })

}

function update_program(req, res,old_json_object,table_name){
    
    var new_pro_name = req.body.pro_name; // req.body... takes the inputs of the form !
    var new_pro_add = req.body.pro_add;

   
    pool.getConnection((err, conn) => {
        var sqlQuery = `update program set program_name=?, address=? where program_id=?`;
        conn.promise().query(sqlQuery, [new_pro_name, new_pro_add, old_json_object.organizationn_id])
        .then(() => {
            pool.releaseConnection(conn);
            req.flash('messages', { type: 'success', value: "Successfully updated "+table_name+"!" })
            res.redirect('/');
        })
        .catch(err => {
            req.flash('messages', { type: 'error', value: "Something went wrong, "+table_name+" could not be updated." })
            res.redirect('/');
        })
    })

}

function update_project(req, res,old_json_object,table_name){
    
    var new_pro_tit = req.body.pro_tit; // req.body... takes the inputs of the form !
    var new_pro_sum = req.body.pro_sum;
    var new_pro_Sdate = req.body.pro_Sdate;
    var new_pro_Edate = req.body.pro_Edate;
    var new_pro_am = req.body.pro_am;
    var new_pro_org_id = req.body.pro_org_id;
    var new_pro_exe_id = req.body.pro_exe_id;
    var new_pro_pro_id = req.body.pro_pro_id;
    var new_pro_eva_id = req.body.pro_eva_id;
    var new_pro_evaluator = req.body.pro_evaluator;
    var new_pro_chief = req.body.pro_chief;

   
    pool.getConnection((err, conn) => {
        var sqlQuery = `update project set title=?, summary=?, start_date=?, end_date=?, amount=?, organizationn_id=?, executive_id=?, program_id=?, evaluation_id=?, evaluator_id=?, chief_id=? where project_id=?`;
        conn.promise().query(sqlQuery, [new_pro_tit, new_pro_sum, new_pro_Sdate, new_pro_Edate, new_pro_am, new_pro_org_id, new_pro_exe_id,new_pro_pro_id,new_pro_eva_id, new_pro_evaluator, new_pro_chief, old_json_object.project_id])
        .then(() => {
            pool.releaseConnection(conn);
            req.flash('messages', { type: 'success', value: "Successfully updated "+table_name+"!" })
            res.redirect('/');
        })
        .catch(err => {
            req.flash('messages', { type: 'error', value: "Something went wrong, "+table_name+" could not be updated." })
            res.redirect('/');
        })
    })

}

exports.perform_update = (req, res, next) => {
    var table_name = req.body.table;
    var json_string = req.body.object;
    var old_json_object = JSON.parse(json_string) // json_object is like a tuple !
    

    if (table_name == 'executive'){ //auto gia ola
        update_executive(req,res,old_json_object,table_name)
    }
    else  if (table_name == 'evaluation'){
        update_evaluation(req,res,old_json_object,table_name)
    }
    else  if (table_name == 'organizationn'){
        update_organization(req,res,old_json_object,table_name)
    }
    else  if (table_name == 'phones'){
        update_phones(req,res,old_json_object,table_name)
    }
    else  if (table_name == 'program'){
        update_program(req,res,old_json_object,table_name)
    }
    else  if (table_name == 'project'){
        update_project(req,res,old_json_object,table_name)
    }
    
   
}

// just show the update form in the instrtion ejs files
exports.showForm = (req,res) =>{
    var table_name = req.body.table;
    var json_string = req.body.object;
    var json_object = JSON.parse(json_string) // json_object is like a tuple !

    // ########### EXECUTIVE ############
    if (table_name == 'executive'){
        res.render('Insertions_Updates/exec.ejs',{
            update: true,
            old_tuple : json_object, 
            pageTitle: 'Update Executive'
        });
    }

    // ########### EVALUATION ############
    if (table_name == 'evaluation'){
        res.render('Insertions_Updates/eval.ejs',{
            update: true,
            old_tuple : json_object, 
            pageTitle: 'Update Evaluation'
        });
    }

    // ########### ORGANIZATION ############
    if (table_name == 'organizationn'){
        res.render('Insertions_Updates/org.ejs',{
            update: true,
            old_tuple : json_object, 
            pageTitle: 'Update Organization'
        });
    }

     // ########### PHONES ############
     if (table_name == 'phones'){
        res.render('Insertions_Updates/phones.ejs',{
            update: true,
            old_tuple : json_object, 
            pageTitle: 'Update Phone'
        });
    }

     // ########### PROGRAM ############
     if (table_name == 'program'){
        res.render('Insertions_Updates/prog.ejs',{
            update: true,
            old_tuple : json_object, 
            pageTitle: 'Update Program'
        });
    }

    // ########### PROJECT ############
    if (table_name == 'project'){
        res.render('Insertions_Updates/proJ.ejs',{
            update: true,
            old_tuple : json_object, 
            pageTitle: 'Update Project'
        });
    }
}

