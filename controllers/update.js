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
        var sqlQuery = `update organizationn set (organization_name=?, abbreviation=?, postal_code=?, street=?, numberr=?, city=?, company_budget=?, university_budget=?, research_center_budget=?) where organizationn_id = ?`;
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
}

