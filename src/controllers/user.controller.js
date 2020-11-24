const sql = require('mssql');
const {config} =require('../database/db');

const  userCtrl = {};


//get function
async function getUsers(){
    try {
        let pool = await sql.connect(config);
        let usuario =  await pool.request().query("SELECT * FROM USERS;");
        return usuario.recordsets;
    } catch (error) {
        console.log(error);
    }
}

//id user function
async function getUserId(id){
    try {
        let pool = await sql.connect(config);
        let usuario =  await pool.request()
        .input('input_parameter', sql.Int, id)
        .query('SELECT * FROM USERS WHERE User_ID = @input_parameter');
        return usuario.recordsets;
    } catch (error) {
        console.log(error);
    }
}

//add edit user function

async function addEditUsuario(usuario) {
    try {
        let pool  = await sql.connect(config);
        let insertUser = await pool.request()
            .input('_id', sql.Int, usuario.User_ID)
            .input('_user_Name', sql.NVarChar, usuario.User_Name)
            .input('_name', sql.NVarChar, usuario.Name)
            .input('_last_Name', sql.NVarChar, usuario.Last_Name)
            .input('_email', sql.NVarChar, usuario.Email)
            .input('_profileID', sql.NVarChar, usuario.Profile_ID)
            .execute('userAddOrEdit');
        return insertUser.recordsets;
    } catch (error) {
        console.log(error);
    }
}

//delete function
async function deleteUserId(id){
    try {
        let pool = await sql.connect(config);
        let usuario =  await pool.request()
        .input('input_parameter', sql.Int, id)
        .query('DELETE FROM USERS WHERE User_ID = @input_parameter');
        return usuario.recordsets;
    } catch (error) {
        console.log(error);
    }
}

//user controllers

userCtrl.getUsuarios = (req, res) => {
    getUsers().then( result =>{
        res.json(result[0]);
    })
}


userCtrl.getUsuarioId = (req, res ) => {
    getUserId(req.params.id).then( result => {
        res.json(result[0]);
    });
}


userCtrl.addUser = (req, res) => {
    let user = {...req.body};
    addEditUsuario(user).then(result =>{
        res.json({status: 'usuario agregado!', result});
        console.log("IDENTIFICACION DE USUARIO AGREGADO: ",     result);
    });
    console.log(req.body);
}

userCtrl.editUser = async (req, res) => {
    let user ={... req.body};
    getUserId(req.params.id);
    addEditUsuario(user).then(result =>{
        res.json({status: 'usuario actualizado!', result});
        console.log("IDENTIFICACION DE USUARIO EDITADO: ",     result);
    });
    console.log(user);
}

userCtrl.deleteUser = (req, res ) => {
    deleteUserId(req.params.id).then( () => {
        res.json({status: 'usuario eliminado!'});
    });
}


module.exports = userCtrl;