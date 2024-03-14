const express = require('express');
const server = express();
const path = require('path');
const router = express.Router();
server.use(express.json());
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const { append } = require('express/lib/response');
server.engine('handlebars', handlebars.engine({ defaultLayout: 'main' }));
server.set('view engine', 'handlebars');
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

var quantidadePessoas = 1;
var quantidadeLivros = 2;

var pessoas = [{ id: 0, nome: "João", idade: 12 }, { id: 1, nome: "Saulo", idade: 15 }]
var livros = [{ id: 0, nome: "Senhor das Moscas" }, { id: 1, nome: "Admiravel Mundo Novo" }, { id: 2, nome: "Frankenstein" }];


server.get('/', function (req, res) {
    res.render('index');
})

server.get('/lista-pessoas', function (req, res) {
    res.render('listaPessoas', { pessoas });
})

server.get('/lista-livros', function (req, res) {
    res.render('listaLivros', { livros });
})


server.get('/formulario-pessoas', (req, res) => {
    res.render('formulario');
})

server.get('/formulario-livros', (req, res) => {
    res.render('formularioLivros');
})

server.post('/adicionarItem', (req, res) => {
    quantidadePessoas++;
    pessoas.push({ id: quantidadePessoas, nome: req.body.nome, idade: req.body.idade });
    var msg = "Adicionado";
    res.render('resposta', { msg });
})

server.post('/adicionarItemLivro', (req, res) => {
    quantidadeLivros++;
    livros.push({ id: quantidadeLivros, nome: req.body.nome });
    var msg = "Adicionado";
    res.render('resposta', { msg });
})

server.post('/alterar-livro-form', (req, res) => {
    var id = req.body.id;
    var nome = req.body.nome;
    res.render('alterarLivroForm', { id, nome });
})

server.post('/alterar-pessoa-form', (req, res) => {
    var id = req.body.id;
    var nome = req.body.nome;
    var idade = req.body.idade;
    res.render('alterarPessoaForm', { id, nome, idade });
})



server.post('/alterar-livro', (req, res) => {
    var idn = req.body.id;
    var i;
    for (i = 0; i < livros.length; i++) {
        if (livros[i].id == idn) {
            livros[i] = { id: req.body.id, nome: req.body.nome };
        }
    }
    var msg = "Adicionado";
    res.render('resposta', { msg });
});

server.post('/alterar-pessoa', (req, res) => {
    var idn = req.body.id;
    var i;
    for (i = 0; i < pessoas.length; i++) {
        if (pessoas[i].id == idn) {
            pessoas[i] = { id: req.body.id, nome: req.body.nome, idade: req.body.idade };
        }
    }
    var msg = "Adicionado";
    res.render('resposta', { msg });
});


server.post('/deletar-pessoa', (req, res) => {
    var idn = req.body.id;
    var i;
    for (i = 0; i < pessoas.length; i++) {
        if (pessoas[i].id == idn) {
            pessoas.splice(i, 1);
        }
    }
    var msg = "Removido";
    res.render('resposta', { msg });
});

server.post('/deletar-livro', (req, res) => {
    var idn = req.body.id;
    var i;
    for (i = 0; i < livros.length; i++) {
        if (livros[i].id == idn) {
            livros.splice(i, 1);
        }
    }

    var msg = "Removido";
    res.render('resposta', { msg });
});

server.post('/pesquisa-livros', (req, res) => {
    const id = req.body.id;
    selecionado = livros[id];
    res.render('listaLivros', { selecionado });
});

server.post('/pesquisa-pessoas', (req, res) => {
    const id = req.body.id;
    selecionado = pessoas[id];
    res.render('listaPessoas', { selecionado });
});




server.listen(3000); 