import express, { response } from 'express';
import path from 'path';
import session from 'express-session';
import cookieParser from 'cookie-parser';

const host = '0.0.0.0';
const porta = 3000;

let listaUsuarios = [];


const app = express();

app.use(express.urlencoded({ extended: true })); 

app.use(session({
    secret: 'Minh4Ch4v3S3cr3t4',
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 15 //15 minutos
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
    const cnpj = requisicao.body.cnpj;
    const razao_social = requisicao.body.razao_social;
    const nome_fantasia = requisicao.body.nome_fantasia;
    const endereco = requisicao.body.endereco;
    const cidade = requisicao.body.cidade;
    const estado = requisicao.body.estado;
    const cep = requisicao.body.cep;
    const email = requisicao.body.email;
    const telefone = requisicao.body. telefone;

    //verificando se os campos foram preenchidos (não estão vazios)
    if (cnpj && razao_social && nome_fantasia && endereco && cidade && estado && cep && email && telefone) 
    {
        listaUsuarios.push({
            cnpj: cnpj,
            razao_social: razao_social,
            nome_fantasia: nome_fantasia,
            endereco: endereco,
            cidade: cidade,
            estado: estado,
            cep: cep,
            email: email,
            telefone: telefone
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
         <title>Menu - APP WEB</title>
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
        top: 185%;
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
         width: 30%;
       padding: 10px;
       border: 1px solid #ccc;
       border-radius: 5px;
       margin-bottom: 20px;
       margin-right: 1000px;
       background-color: #fff;
       color: #000000;
     }
     
     input[type="number"]{
         width: 30%;
       padding: 10px;
       border: 1px solid #ccc;
       border-radius: 5px;
       margin-bottom: 20px;
       margin-right: 1000px;
       background-color: #fff;
       color: #000000;
     }
     
     select {
       width: 30%;
       padding: 10px;
       border: 1px solid #ccc;
       border-radius: 5px;
       margin-bottom: 20px;
       background-color: #fff;
       color: #333;
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
             <legend>Cadastro de Empresa</legend>
             <label for="cnpj">CNPJ:</label>
             <input type="number" id="cnpj" name="cnpj">`);
             if (cnpj == ""){
                resposta.write(`
                            <div m-2 class="alert alert-danger" role="alert">
                                Por favor, informe o CNPJ da empresa.
                            </div>
                `);
            }

        resposta.write(`
        <label for="razao_social">Razão Social ou Nome do Fornecedor:</label>
        <input type="text" id="razao_social" name="razao_social">`);
        if (razao_social == ""){
            resposta.write(`
                        <div m-2 class="alert alert-danger" role="alert">
                            Por favor, informe o fornecedor da empresa.
                        </div>
            `);
        }
        resposta.write(` <label for="nome_fantasia">Nome da Empresa:</label>
        <input type="text" id="nome_fantasia" name="nome_fantasia">`);
        if (nome_fantasia == ""){
            resposta.write(`<div m-2 class="alert alert-danger" role="alert">
                                Por favor, informe o nome da empresa.
                            </div>`);
        }        
        resposta.write(`
        <label for="endereco">Endereço:</label>
        <input type="text" id="endereco" name="endereco">
        `);            
        if (endereco == ""){
            resposta.write(`<div class="alert alert-danger" role="alert">
                                Por favor, informe o endereço da empresa.
                            </div>`);
        }
        resposta.write(`     <label for="cidade">Cidade:</label>
        <input type="text" id="cidade" name="cidade">`
        );
        if (cidade == ""){
            resposta.write(`<div class="alert alert-danger" role="alert">
                                Por favor, informe a cidade da empresa.
                            </div>`);
        }
        resposta.write(`<label for="estado" class="form-label">UF</label>
        <select class="form-select" id="estado" name="estado" required>
            <option selected disabled value="">Escolha um estado...</option>
            <option value="AC">AC</option>
            <option value="AL">AL</option>
            <option value="AP">AP</option>
            <option value="AM">AM</option>
            <option value="BA">BA</option>
            <option value="CE">CE</option>
            <option value="DF">DF</option>
            <option value="ES">ES</option>
            <option value="GO">GO</option>
            <option value="MA">MA</option>
            <option value="MT">MT</option>
            <option value="MS">MS</option>
            <option value="MG">MG</option>
            <option value="PA">PA</option>
            <option value="PB">PB</option>
            <option value="PR">PR</option>
            <option value="PE">PE</option>
            <option value="PI">PI</option>
            <option value="RJ">RJ</option>
            <option value="RN">RN</option>
            <option value="RS">RS</option>
            <option value="RO">RO</option>
            <option value="RR">RR</option>
            <option value="SC">SC</option>
            <option value="SP">SP</option>
            <option value="SE">SE</option>
            <option value="TO">TO</option>
        </select>`
        );
        if (!estado){
            resposta.write(`<div class="alert alert-danger" role="alert">
                                Por favor, selecione um estado.
                            </div>`);
        }
        resposta.write(`<label for="cep">CEP:</label>
        <input type="number" id="cep" name="cep" maxlength="8">`);
        if (cep == ""){
            resposta.write(`<div class="alert alert-danger" role="alert">
                                Por favor, informe o CEP da empresa.
                            </div>`);
        }

        resposta.write(` <label for="email">Email:</label>
        <input type="email" id="email" name="email">`);
        if (email == ""){
            resposta.write(`<div class="alert alert-danger" role="alert">
                                Por favor, informe o e-mail da empresa.
                            </div>`);
        }
        resposta.write(` <label for="telefone">Telefone:</label>
        <input type="tel" id="telefone" name="telefone" required>`);
        if (telefone == ""){
            resposta.write(`<div class="alert alert-danger" role="alert">
                                Por favor, informe o telefone da empresa.
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
    if(req.cookie.dataUltimoAcesso){
        resp.write('<p>');
        resp.write('Seu ultimo acesso foi em ' + requ.cookie.dataUltimoAcesso);
        resp.write('</p>');
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

app.get('/listarUsuarios', usuarioEstaAutenticado, (req,resp)=>{
    resp.write('<html>');
    resp.write('<head>');
    resp.write('<title>Resultado do cadastro</title>');
    resp.write('<meta charset="utf-8">');
    resp.write('<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">')
    resp.write('</head>');
    resp.write('<body>');
    resp.write('<h1>Lista de Empresas</h1>');
    resp.write('<table class="table table-success table-s">');
    resp.write('<tr>');
    resp.write('<th>CNPJ</th>');
    resp.write('<th>Razão Social ou Nome do Fornecedor</th>');
    resp.write('<th>Nome da Empresa</th>');
    resp.write(`<th>Endereço</th>`);
    resp.write('<th>Cidade</th>');
    resp.write('<th>Estado</th>');
    resp.write('<th>CEP</th>');
    resp.write('<th>Email</th>');
    resp.write('<th>Telefone</th>');
    resp.write('</tr>');
    for (let i=0; i<listaUsuarios.length; i++){
        resp.write('<tr>');
        resp.write(`<td>${listaUsuarios[i].cnpj}`);
        resp.write(`<td>${listaUsuarios[i].razao_social}`);
        resp.write(`<td>${listaUsuarios[i].nome_fantasia}`);
        resp.write(`<td>${listaUsuarios[i].endereco}`);
        resp.write(`<td>${listaUsuarios[i].cidade}`);
        resp.write(`<td>${listaUsuarios[i].estado}`);
        resp.write(`<td>${listaUsuarios[i].cep}`);
        resp.write(`<td>${listaUsuarios[i].email}`);
        resp.write(`<td>${listaUsuarios[i].telefone}`);
        resp.write('</tr>');
    }
    resp.write('</table>');
    resp.write('<a class="btn btn-secondary" href="/">Voltar</a> ');
    resp.write('<br/>');

    if(req.cookie.dataUltimoAcesso){
        resp.write('<p>');
        resp.write('Seu ultimo acesso foi em ' + req.cookie.dataUltimoAcesso);
        resp.write('</p>');
      }

    resp.write('</body>');
    resp.write('</html>');
    resp.end();
});

app.listen(porta, host, () => {
    console.log(`Servidor rodando em http://${host}:${porta}`);
})