const express = require('express');
const app = express();
const Port = 3000;
const path = require('path');
const hbs = require('hbs');
const mysql = require('mysql2');

const conexion = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Fito64Oddone",
    database: "proyectofinal"
});

conexion.connect((error) =>{
    if(error) throw error;
    console.log('Conexión a la Data Base exitosa');
});

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname,'views'));
hbs.registerPartials(path.join(__dirname,'views/partials'));

app.get('/', (req, res) =>{
    res.render('index.hbs', {titulo:'Patagonia a tu alcance'})
});

app.post('/index.hbs', (req, res) =>{    
    const {email, con1} = req.body;  
        
            
    if(email != ""|| con1 != ""){
        {
            console.log(email);
            console.log(con1);
        }          

    let data = {
        mail: email,
        contraseña: con1
    }

    let sql = 'SELECT * FROM proyectofinal.usuarios where mail = \'' + email + '\' and contraseña = \'' + con1 + '\'';
    console.log(sql);
    conexion.query(sql, (error, results) =>{
        if(error) throw error;
        let comprobacion = 'Ingreso nuevo exitoso!'
        res.render('saludo.hbs', {titulo: 'Saludo', comprobacion})
    })

    }
    else{
        let validacion = 'Faltan datos para el nuevo ingreso';
        res.render('index.hbs', {titulo: 'Login', validacion});
    }   
}); 

app.get('/quienes.hbs', (req, res) =>{
    res.render('quienes.hbs', {titulo:'Quienes somos'})
});

app.get('/saludo.hbs', (req, res) =>{
res.render('saludo.hbs', {titulo:'Saludo'})
});

app.get('/formulario.hbs', (req, res) =>{
    res.render('formulario.hbs', {titulo:'Formulario'})
    });


app.post('/formulario.hbs', (req, res) =>{
const {contacto, gasto, mail, descrip} = req.body;


    
    if(contacto == "" || gasto == "" || mail == "" || descrip == ""){
        let validacion = 'Faltan datos para enviar el formulario'
        res.render('formulario', {titulo: 'Formulario', validacion})
    }
    else
    {
        console.log(contacto);
        console.log(gasto);
        console.log(mail);
        console.log(descrip);
    }

    let data = {
        consulta_nombre: contacto,
        consulta_monto: gasto,
        consulta_mail: mail,
        consulta_descrip: descrip
    }

    let sql = 'Insert into consultas set ?';
    conexion.query(sql, data, (error, results) =>{
        if(error) throw error;
        let comprobacion = 'Ingreso nuevo exitoso!'
        res.render('formulario', {titulo: 'Formulario', comprobacion})
    });

});


app.get('/registro.hbs', (req, res) =>{
    res.render('registro.hbs', {titulo:'Registro'})
    });

app.post('/registro.hbs', (req, res) =>{
    const {nuevomail, contra1} = req.body;  
        
            
        if(nuevomail == "" || contra1 == ""){
                let validacion = 'Faltan datos para el nuevo ingreso';
                res.render('registro', {titulo: 'Registro', validacion});
            }
        else
            {
                console.log(nuevomail);
                console.log(contra1);
            }          

        let data = {
            mail: nuevomail,
            contraseña: contra1
        }
    
        let sql = 'Insert into usuarios set ?';
        conexion.query(sql, data, (error, results) =>{
            if(error) throw error;
            let comprobacion = 'Ingreso nuevo exitoso!'
            res.render('registro', {titulo: 'Registro', comprobacion})
        });
    }
    
);

app.listen(Port, () =>{
    console.log('Servidor está trabajando en el Puerto ' + Port);
});

app.on('error', (err) =>{
    console.log('Error en la ejecución del Servidor ' + err);
});



