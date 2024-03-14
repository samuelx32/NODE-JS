const express = require('express');
const server = express();
server.use(express.json());
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');
const Handlebars = require('handlebars');
const path = require('path');
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'pantera2256!',
    database: 'banco_teste_atz'
})

connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
    } else {
        console.log('connected as id ' + connection.threadId);
    }
})




server.engine('handlebars', handlebars.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views/layouts')
}))

server.set('view engine', 'handlebars');
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.use(express.static('public'))

Handlebars.registerHelper('verificaV', function (value) {
    return value === 1;
});

Handlebars.registerHelper('conta', function (value) {
    return value === 1;
});

Handlebars.registerHelper('cartao', function (value) {
    return value === 2;
});

Handlebars.registerHelper('emprestimo', function (value) {
    return value === 3;
});

Handlebars.registerHelper('financiamento', function (value) {
    return value === 4;
});

Handlebars.registerHelper('recebiveis', function (value) {
    return value === 5;
});

Handlebars.registerHelper('adiantamento', function (value) {
    return value === 6;
});

var logado = 0;
server.get('/', (req, res) => {
    if(logado == 0){
        return res.render('login', { layout : false });
    }else{
        return res.render('bbomberman', {titulo: 'BBOMBERMAN'});  
    }
    
})

server.get('/sair', (req, res) => {
    logado = 0;
    return res.render('login', { layout : false });
})

server.get('/projetos', (req, res) => {
    if(logado == 1){
        return res.render('projetos', { titulo: 'Projeto BBomberman' });
    }else{
        return res.render('login', { layout : false });
    }
    
})

server.get('/funil', (req, res) => {
    if(logado == 1){
        return res.render('funil', { titulo: 'Funil de Autorizações' });
    }else{
        return res.render('login', { layout : false });
    }
    
})

server.get('/consumo', (req, res) => {
    if(logado == 1){
        return res.render('consumo', { titulo: 'Funil de Consumos' });
    }else{
        return res.render('login', { layout : false });
    }
})

server.get('/erros', (req, res) => {
    if(logado == 1){
        return res.render('erros', { titulo: 'Painel de Erros' });
    }else{
        return res.render('login', { layout : false });
    }
})

server.get('/cad-atz', (req, res) => {
    if(logado == 1){
        return res.render('cad-atz', { titulo: 'Projeto BBomberman' });
    }else{
        return res.render('login', { layout : false });
    }
})

server.get('/bbomberman', (req, res) => {
    if(logado == 1){
        return res.render('bbomberman', { titulo: 'Projeto BBomberman' });
    }else{
        return res.render('login', { layout : false });
    }
    
})

server.get('/velha', (req, res) => {
    if(logado == 1){
        return res.render('velha', { titulo: 'Jogo da velha' });
    }else{
        return res.render('login', { layout : false });
    }
    
})


var clientes;
var estados_vetor = [];

server.post('/consulta-cpf', (req, res) => {
    var cpf = req.body.cpf;
    var i = 0;
    var estados2;

    connection.query('select * from cli_atz where cpf = ?', [cpf], function (error, results, fields) {
       
        if(error || results == ""){
            msg = "CPF não encontrado!!!";
            res.render('funil',{msg, titulo: 'Funil de Autorizações'});
        }else{
            clientes = results;
            
            while(i < clientes.length){
                var numero_sql = clientes[i]["num_sql"];
                estados_vetor = edita_estado(numero_sql, estados_vetor);
                clientes[i]["situacao"] = estados_vetor[i];
                i++;     
                
            }
             
        }
        

        res.render('funil', { clientes, titulo: 'Funil de Autorizações' });  
    });


    

});

server.post('/consulta-cpf2', (req, res) => {
    var cpf = req.body.cpf;
    var i = 0;
    connection.query("SELECT * FROM cli_atz JOIN est_atz ON (cli_atz.num_sql = est_atz.num_sql) where cli_atz.cpf = ?", [cpf], function (error, results, fields) {
        if(error || results == ""){
            msg = "CPF não encontrado ou não possui autorizações...";
            res.render('funil',{msg, titulo: 'Funil de Autorizações'});
        }else{
            clientes = results;
            while(i < clientes.length){
                clientes[i]["data_cric"] = formataDH(clientes[i]["data_cric"]);
                clientes[i]["data_vld"] = formataDH(clientes[i]["data_vld"]);
                
                switch(clientes[i]["estado_atz"]){
                    case 1:
                        clientes[i]["mostra"] = 1;
                        clientes[i]["situacao"] = "solicitado";
                        break;
                    case 2:
                        clientes[i]["mostra"] = 1;
                        clientes[i]["situacao"] = "aprovado";
                        var x = 0;
                        while(x < i){
                            if(clientes[x]["num_sql"] == clientes[i]["num_sql"]){
                                clientes[x]["mostra"] = 0;
                            }
                            x++;
                        }
                        break;
                    case 3:
                        clientes[i]["mostra"] = 1;
                        clientes[i]["situacao"] = "negado";
                        var x = 0;
                        while(x < i){
                            if(clientes[x]["num_sql"] == clientes[i]["num_sql"]){
                                clientes[x]["mostra"] = 0;
                            }
                            x++;
                        }
                        break;
                    default:
                        clientes[i]["situacao"] = "erro";          
                }
                i++;
            }


            res.render('funil', {clientes, titulo: 'Funil de Autorizações'});   
        }  
    });
});

function formataDH(data){
    const meses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul","Ago","Set","Out","Nov","Dez"];
    return (adicionaZero(data.getDate()) + "/" + meses[((data.getMonth()))] + "/" + data.getFullYear() + " - " + adicionaZero(data.getHours()) + ":"+ adicionaZero(data.getMinutes()) + ":"+adicionaZero(data.getSeconds()));
}

function adicionaZero(numero){
    if(numero < 10){
        return "0" + numero;
    }else{
        return numero;
    }
}

function edita_estado(num, vetorI){
    var vetor = vetorI, est_num = 0;

    vetor.push("solicitado");

    return vetor;
}

server.post('/consulta-atz', (req, res) => {
    var num_sql = req.body.num_sql;
    var estados, recursos, situacao, est_num, est_data, desc_rcs,data_rcs, tipo, objeto_artificial;
    connection.query('select * from est_atz where num_sql = ?', [num_sql], function (error, results, fields) {
        estados = results;
        estados.map(function (item) {
            est_num = item.estado_atz;
            est_data = item.data_atz;
        })
        est_data = formataDH(est_data);
        switch (est_num) {
            case 1:
                situacao = "solicitado";
                break;
            case 2:
                situacao = "aprovado";
                break;
            case 3:
                situacao = "negado";
                break;
            default:
                situacao = "erro";
        }

        connection.query('select * from rcs_atz where num_sql = ?', [num_sql], function (error, results, fields) {
            recursos = results;
            var x = 0;
            while(x < recursos.length){
                recursos[x]["data_vrf"] = formataDH(recursos[x]["data_vrf"]);
                x++;
            }
         
            res.render('funil', { clientes, situacao,estados,est_data, recursos, titulo: 'Funil de Autorizações' });
        });
    });




});





server.post('/inserir-cpf', (req, res) => {
    var num_sql = req.body.num_sql;
    var cpf = req.body.cpf;
    var text_atz = req.body.text_atz;
    var data_vld = req.body.data_vld;
    var num_marc = req.body.num_marc;

    connection.query('insert into cli_atz values (?,?,?,?,?)', [num_sql, cpf, text_atz, data_vld, num_marc], function (error, results, fields) {
        if(error || results == ""){
            msg = "Erro!!!";
            res.render('cad-atz',{msg, titulo: 'Funil de Autorizações'});
        }else{
            msg = "Inserido!!!";
            res.render('cad-atz', { msg, titulo: 'Funil de Autorizações' });   
        }
    });
    

});

server.post('/inserir-estado', (req, res) => {
    var id = 0;
    var num_sql = req.body.num_sql;
    var estado_atz = req.body.estado_atz;
    var data_est = req.body.data_est;

    connection.query('insert into est_atz values (?,?,?,?)', [id,num_sql, estado_atz, data_est], function (error, results, fields) {
        if(error || results == ""){
            msg = "Erro!!!";
            res.render('cad-atz',{msg1, titulo: 'Funil de Autorizações'});
        }else{
            msg = "Inserido!!!";
            res.render('cad-atz', { msg1, titulo: 'Funil de Autorizações' });   
        }
    });
    

});

server.post('/inserir-recurso', (req, res) => {
    var id = 0;
    var num_sql = req.body.num_sql;
    var tipo_rcs = req.body.tipo_rcs;
    var data_vrf = req.body.data_vrf;

    connection.query('insert into rcs_atz values (?,?,?,?)', [id,num_sql, tipo_rcs, data_vrf], function (error, results, fields) {
        if(error || results == ""){
            msg = "Erro!!!";
            res.render('cad-atz',{msg2, titulo: 'Funil de Autorizações'});
        }else{
            msg = "Inserido!!!";
            res.render('cad-atz', { msg2, titulo: 'Funil de Autorizações' });   
        }
    });
    

});





server.post('/verificaUser',(req,res) => {
    var usuario = req.body.usuario;
    var senha = req.body.senha;

    connection.query('select * from usuarios where usuario = ? and senha = ?', [usuario,senha], function (error, results, fields) {
        if(error || results == ""){
            msg = "Usuário Não Encontrado!!!";
            return res.render('login',{msg, layout : false});
        }else{
            logado = 1;
            return res.render('bbomberman', {titulo: 'BBOMBERMAN'});   
        }
    });

})

server.listen(3000); 