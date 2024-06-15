import express from 'express';
import path from 'path';
import session from 'express-session';
import cookieParser from 'cookie-parser';

const host = '0.0.0.0';
const porta = 3000;

let listaUsuarios = [];
let listaPets = [];
let listaDesejos = [];


const app = express();

app.use(express.urlencoded({ extended: true })); 

app.use(session({
    secret: 'MinH4Ch4v3S3cr3t4',
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 30 //30 minutos
    }
}));


app.use(cookieParser());


function usuarioEstaAutenticado(requisicao, resposta, next){
if(requisicao.session.usuarioAutenticado){
next();
}
else{
    resposta.redirect ('/login.html');
}

}


function cadastrarUsuario(requisicao, resposta){
    const name = requisicao.body.name;
    const email = requisicao.body.email;
    const tel = requisicao.body.tel;

    //verificando se os campos foram preenchidos (não estão vazios)
    if (name && email && tel) 
    {
        listaUsuarios.push({
            name: name,
            email: email,
            tel: tel,
        });
        resposta.redirect('/listarUsuarios');
    }
    else
    {
     resposta.write(`
     <!DOCTYPE html>
     <html>
     <head>
         <meta charset="UTF-8">
         <meta name="viewport" content="width=device-width, initial-scale=1.0">
         <title>Cadastro-Interessado</title>
         <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
         </head>
     </head>
     <body>
     
         <style>
         form {
            max-width: 600px;
            margin: 40px auto;
            padding: 40px;
            background-color: #D3d3d3;
            border: 1px solid #000000;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            position: absolute;
            top: 80%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
          
          legend {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 10px;
            color: #333;
          text-align: center;}
          
          label {
            display: block;
            margin-bottom: 10px;
            font-weight: bold;
            color: #000000;
          }
          
          input[type="text"],
          input[type="email"]{
            width: 100%;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
            margin-bottom: 20px;
            background-color: #fff;
            color: #000000;
          }
          
          input[type="text"]:focus,
          input[type="email"]:focus {
            border-color: #aaa;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
          
          
          input[type="tel"]{
              width: 40%;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
            margin-bottom: 20px;
            margin-right: 1000px;
            background-color: #fff;
            color: #000000;
          }
          
          select {
            width: 300%;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
            margin-bottom: 20px;
            background-color: #fff;
            color: #612323;
          }
          
          input[type="submit"] {
            background-color: #4CAF50;
            color: #fff;
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            
          }
          
          input[type="submit"]:hover {
            background-color: #3e8e41;
          }
         </style>
     
         <form method="POST" action='/cadastrarUsuario' class="border row g-3 needs-validation" novalidate>
         <legend>Cadastro de Interessado</legend>
         <label for="name">Nome:</label>
         <input type="text" id="name" name="name">`);
             if (name == ""){
                resposta.write(`
                            <div m-2 class="alert alert-danger" role="alert">
                                Por favor, informe o nome do interessado.
                            </div>
                `);
            }

        
        resposta.write(` <label for="email">Email:</label>
        <input type="email" id="email" name="email">`);
        if (email == ""){
            resposta.write(`<div m-2 class="alert alert-danger" role="alert">
                                Por favor, informe o email do interessado.
                            </div>`);
        }        
        resposta.write(`
        <label for="pc">Telefone:</label>
        <input type="tel" id="tel" name="tel">
        `);            
        if (tel == ""){
            resposta.write(`<div class="alert alert-danger" role="alert">
                                Por favor, informe o telefone do interessado.
                            </div>`);
        }
        resposta.write(` <div class="col-12 mb-3">
        <button class="btn btn-primary" type="submit">Cadastrar</button>
        <a class="btn btn-secondary" href="/">Voltar</a>                   
    </div>
        </form>
    </body>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
    crossorigin="anonymous"></script>
    </html>`);

        resposta.end(); 
    }

}

function cadastrarPet(requisicao, resposta){
    const nome = requisicao.body.nome;
    const raca = requisicao.body.raca;
    const idade = requisicao.body.idade;

    //verificando se os campos foram preenchidos (não estão vazios)
    if (nome && raca && idade) 
    {
        listaPets.push({
            nome: nome,
            raca: raca,
            idade: idade,
        });
        resposta.redirect('/listarPets');
    }
    else
    {
     resposta.write(`
     <!DOCTYPE html>
     <html>
     <head>
         <meta charset="UTF-8">
         <meta name="viewport" content="width=device-width, initial-scale=1.0">
         <title>Cadastro-Pets</title>
         <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
         </head>
     </head>
     <body>
     
         <style>
         form {
            max-width: 600px;
            margin: 40px auto;
            padding: 40px;
            background-color: #D3d3d3;
            border: 1px solid #000000;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            position: absolute;
            top: 80%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
          
          legend {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 10px;
            color: #333;
          text-align: center;}
          
          label {
            display: block;
            margin-bottom: 10px;
            font-weight: bold;
            color: #000000;
          }
          
          input[type="text"]{
            width: 100%;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
            margin-bottom: 20px;
            background-color: #fff;
            color: #000000;
          }
          
          input[type="text"]:focus,
          input[type="email"]:focus {
            border-color: #aaa;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
          
          
          input[type="number"]{
              width: 40%;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
            margin-bottom: 20px;
            margin-right: 1000px;
            background-color: #fff;
            color: #000000;
          }
          
          select {
            width: 300%;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
            margin-bottom: 20px;
            background-color: #fff;
            color: #612323;
          }
          
          input[type="submit"] {
            background-color: #4CAF50;
            color: #fff;
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            
          }
          
          input[type="submit"]:hover {
            background-color: #3e8e41;
          }
         </style>
     
         <form method="POST" action='/cadastrarPet' class="border row g-3 needs-validation" novalidate>
         <legend>Cadastro de Pets</legend>
         <label for="nome">Nome:</label>
         <input type="text" id="nome" name="nome">`);
             if (nome == ""){
                resposta.write(`
                            <div m-2 class="alert alert-danger" role="alert">
                                Por favor, informe o nome do Pet.
                            </div>
                `);
            }

        
        resposta.write(` <label for="raca">Raça:</label>
        <input type="text" id="raca" name="raca">`);
        if (raca == ""){
            resposta.write(`<div m-2 class="alert alert-danger" role="alert">
                                Por favor, informe a raça do Pet.
                            </div>`);
        }        
        resposta.write(`
        <label for="idade">Idade(em anos):</label>
        <input type="number" id="idade" name="idade">
        `);            
        if (idade == ""){
            resposta.write(`<div class="alert alert-danger" role="alert">
                                Por favor, informe a idade do Pet.
                            </div>`);
        }
        resposta.write(` <div class="col-12 mb-3">
        <button class="btn btn-primary" type="submit">Cadastrar</button>
        <a class="btn btn-secondary" href="/">Voltar</a>                   
    </div>
        </form>
    </body>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
    crossorigin="anonymous"></script>
    </html>`);

        resposta.end(); 
    }

}

function autenticarUsuario(requisicao, resposta){
const usuario = requisicao.body.usuario;
const senha = requisicao.body.senha;
if(usuario == 'admin' && senha == '123'){
    requisicao.session.usuarioAutenticado = true;
    resposta.cookie('dataUltimoAcesso', new Date().toLocaleString(),{
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 30
    });
    resposta.redirect('/');
}


else{
    resposta.write('<!DOCTYPE html>');
    resposta.write('<html>');
    resposta.write('<head>');
    resposta.write('<title>Falha ao realizar login</title>');
    resposta.write('<meta charset="utf-8">');
    resposta.write('</head>');
    resposta.write('<body>');
    resposta.write('<p>Usuário ou senha invalidos</p>');
    resposta.write('<a href="/login.html">Voltar</a>');
    if (requisicao.cookies.dataUltimoAcesso){
        resposta.write('<p>');
        resposta.write('Seu último acesso foi em ' + requisicao.cookies.dataUltimoAcesso);
        resposta.write('</p>');
    }
    resposta.write('</body>');
    resposta.write('</html>');
    //resposta.write('<input type="button" value="voltar" onclick="history.go(-1)"/>');
    resposta.end();
}
}

app.post('/login', autenticarUsuario);

app.get('/login', (req,resp)=>{
    resp.redirect('/login.html');
});

app.get('/logout', (req, resp)=>{
    req.session.destroy();
    //req.session.usuarioLogado = false;
    resp.redirect('/login.html');
});

app.use(express.static(path.join(process.cwd(), 'publico')));

app.use(usuarioEstaAutenticado,express.static(path.join(process.cwd(), 'protegido')));

app.post('/cadastrarUsuario', usuarioEstaAutenticado, cadastrarUsuario);
app.post('/cadastrarPet', usuarioEstaAutenticado, cadastrarPet);

app.get('/listarUsuarios', usuarioEstaAutenticado, (req,resp)=>{
    resp.write('<html>');
    resp.write('<head>');
    resp.write('<title>Resultado do cadastro</title>');
    resp.write('<meta charset="utf-8">');
    resp.write('<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">')
    resp.write('</head>');
    resp.write('<body>');
    resp.write('<h1>Lista de Interessados</h1>');
    resp.write('<table class="table table-success table-s">');
    resp.write('<tr>');
    resp.write('<th>Nome</th>');
    resp.write('<th>Email</th>');
    resp.write('<th>Telefone</th>');
    resp.write('</tr>');
    for (let i=0; i<listaUsuarios.length; i++){
        resp.write('<tr>');
        resp.write(`<td>${listaUsuarios[i].name}`);
        resp.write(`<td>${listaUsuarios[i].email}`);
        resp.write(`<td>${listaUsuarios[i].tel}`);
        resp.write('</tr>');
    }
    resp.write('</table>');
    resp.write('<a class="btn btn-secondary" href="/">Voltar</a> ');
    if (req.cookies.dataUltimoAcesso){
        resp.write('<p>');
        resp.write('Seu último acesso foi em ' + req.cookies.dataUltimoAcesso);
        resp.write('</p>');
    }
    resp.write('<br/>');
    resp.write('</body>');
    resp.write('</html>');
    resp.end();
});


app.get('/listarPets', usuarioEstaAutenticado, (req,resp)=>{
    resp.write('<html>');
    resp.write('<head>');
    resp.write('<title>Resultado do cadastro</title>');
    resp.write('<meta charset="utf-8">');
    resp.write('<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">')
    resp.write('</head>');
    resp.write('<body>');
    resp.write('<h1>Lista de Pets</h1>');
    resp.write('<table class="table table-success table-s">');
    resp.write('<tr>');
    resp.write('<th>Nome</th>');
    resp.write('<th>Raça</th>');
    resp.write('<th>Idade</th>');
    resp.write('</tr>');
    for (let i=0; i<listaPets.length; i++){
        resp.write('<tr>');
        resp.write(`<td>${listaPets[i].nome}`);
        resp.write(`<td>${listaPets[i].raca}`);
        resp.write(`<td>${listaPets[i].idade}`);
        resp.write('</tr>');
    }
    resp.write('</table>');
    resp.write('<a class="btn btn-secondary" href="/">Voltar</a> ');
    if (req.cookies.dataUltimoAcesso){
        resp.write('<p>');
        resp.write('Seu último acesso foi em ' + req.cookies.dataUltimoAcesso);
        resp.write('</p>');
    }
    resp.write('<br/>');
    resp.write('</body>');
    resp.write('</html>');
    resp.end();
});


app.get('/desejarAdocao', usuarioEstaAutenticado, (req, resp) => {
    const interessadosOptions = listaUsuarios.map((interessado, index) => {
        return `<option value="${index}">${interessado.name}</option>`;
    }).join('');

    const petsOptions = listaPets.map((pet, index) => {
        return `<option value="${index}">${pet.nome}</option>`;
    }).join('');

    resp.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Desejo de Adoção</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
           integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
        </head>
        <body>
            <h1>Desejo de Adoção</h1>
            <form action="/registrarDesejo" method="post">
                <div class="mb-3">
                    <label for="interessado" class="form-label">Interessado</label>
                    <select class="form-select" id="interessado" name="interessado">
                        <option selected disabled>Selecione um interessado</option>
                        ${interessadosOptions}
                    </select>
                </div>
                <div class="mb-3">
                <label for="pet" class="form-label">Pet</label>
                <select class="form-select" id="pet" name="pet">
                    <option selected disabled>Selecione um pet</option>
                    ${petsOptions}
                </select>
            </div>
            <button type="submit" class="btn btn-primary">Registrar Desejo</button>
        </form>
        <a class="btn btn-secondary" href="/">Voltar</a>
        ${req.cookies.dataUltimoAcesso? `<p>Seu último acesso foi em ${req.cookies.dataUltimoAcesso}</p>` : ''}
        <br/>
    </body>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
    crossorigin="anonymous"></script>
    </html>
`);

resp.end();
});

app.post('/registrarDesejo', usuarioEstaAutenticado, (req, resp) => {
const interessadoIndex = parseInt(req.body.interessado);
const petIndex = parseInt(req.body.pet);

const dataManifestacao = new Date().toISOString();

listaDesejos.push({
    interessado: listaUsuarios[interessadoIndex],
    pet: listaPets[petIndex],
    dataManifestacao
});

resp.redirect('/desejos');

});

app.get('/desejos', usuarioEstaAutenticado, (req, resp) => {
resp.write('<!DOCTYPE html>');
resp.write('<html>');
resp.write('<head>');
resp.write('<title>Resultado do cadastro</title>');
resp.write('<meta charset="utf-8">');
resp.write('<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">')
resp.write('</head>');
resp.write('<body>');
resp.write('<h1>Lista de Desejos</h1>');
resp.write('<table class="table table-success table-striped">');
resp.write('<tr>');
resp.write('<th>Interessado</th>');
resp.write('<th>Pet</th>');
resp.write('<th>Data de Manifestação</th>');
resp.write('</tr>');
for (let i = 0; i < listaDesejos.length; i++) {
  resp.write('<tr>');
  resp.write(`<td>${listaDesejos[i].interessado.name}</td>`);
  resp.write(`<td>${listaDesejos[i].pet.nome}</td>`);
  resp.write(`<td>${listaDesejos[i].dataManifestacao}</td>`);
  resp.write('</tr>');
}
resp.write('</table>');
resp.write('<a class="btn btn-secondary" href="/">Voltar</a> ');
if (req.cookies.dataUltimoAcesso) {
  resp.write('<p>');
  resp.write('Seu último acesso foi em ' + req.cookies.dataUltimoAcesso);
  resp.write('</p>');
}
resp.write('<br/>');
resp.write('</body>');
resp.write('</html>');
resp.end();
});



  app.get('/', usuarioEstaAutenticado, (req, resp) => {
    resp.write('<!DOCTYPE html>');
    resp.write('<html>');
    resp.write('<head>');
    resp.write('<title>Sistema de Adoção</title>');
    resp.write('<meta charset="utf-8">');
    resp.write('</head>');
    resp.write('<body>');
    resp.write('<h1>Sistema de Adoção</h1>');
    resp.write('<p>Seja bem-vindo!</p>');
    if (req.cookies.dataUltimoAcesso) {
      resp.write('<p>');
      resp.write('Seu último acesso foi em ' + req.cookies.dataUltimoAcesso); 
      resp.write('</p>');
    }
    resp.write('<a class="btn btn-primary" href="/listarUsuarios">Listar Interessados</a>');
    resp.write('<a class="btn btn-primary" href="/listarPets">Listar Pets</a>');
    resp.write('<a class="btn btn-primary" href="/desejarAdocao">Desejar Adoção</a>');
    resp.write('</body>');
    resp.write('</html>');
    resp.end();
  });



          




app.listen(porta, host, () => {
    console.log(`Servidor rodando em http://${host}:${porta}`);
});

