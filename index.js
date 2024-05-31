import express from 'express';
import path from 'path';
import session from 'express-session';
import cookieParser from 'cookie-parser';

const host = '0.0.0.0';
const porta = 3000;

let listaUsuarios = [];


const app = express();

app.use(express.urlencoded({ extended: true })); 

app.use(session({
    secret: 'MinH4Ch4v3S3cr3t4',
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
    const cod = requisicao.body.cod;
    const desc = requisicao.body.desc;
    const pc = requisicao.body.pc;
    const pv = requisicao.body.pv;
    const dv = requisicao.body.dv;
    const qe = requisicao.body.qe;
    const nf = requisicao.body.nf;

    //verificando se os campos foram preenchidos (não estão vazios)
    if (cod && desc && pc && pv && dv && qe && nf) 
    {
        listaUsuarios.push({
            cod: cod,
            desc: desc,
            pc: pc,
            pv: pv,
            dv: dv,
            qe: qe,
            nf: nf,
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
         <label for="cod">Código de barras:</label>
         <input type="number" id="cod" name="cod">`);
             if (cod == ""){
                resposta.write(`
                            <div m-2 class="alert alert-danger" role="alert">
                                Por favor, informe o código de barras do porduto.
                            </div>
                `);
            }

        
        resposta.write(` <label for="desc">Descrição do produto:</label>
        <input type="text" id="desc" name="desc">`);
        if (desc == ""){
            resposta.write(`<div m-2 class="alert alert-danger" role="alert">
                                Por favor, informe a descrição do produto.
                            </div>`);
        }        
        resposta.write(`
        <label for="pc">Preço de custo:</label>
        <input type="number" id="pc" name="pc">
        `);            
        if (pc == ""){
            resposta.write(`<div class="alert alert-danger" role="alert">
                                Por favor, informe o preço de custo do produto.
                            </div>`);
        }
        resposta.write(`    <label for="pv">Preço de venda:</label>
        <input type="number" id="pv" name="pv">`
        );
        if (pv == ""){
            resposta.write(`<div class="alert alert-danger" role="alert">
                                Por favor, informe o preço de venda do produto.
                            </div>`);
        }
       
        resposta.write(` <label for="dv">Data de validade:</label>
        <input type="date" id="dv" name="dv">
`);
        if (dv == ""){
            resposta.write(`<div class="alert alert-danger" role="alert">
                                Por favor, informe a data de validade do produto.
                            </div>`);
        }

        resposta.write(` <label for="qe">Quantidade em estoque</label>
        <input type="number" id="qe" name="qe">`);
        if (qe == ""){
            resposta.write(`<div class="alert alert-danger" role="alert">
                                Por favor, informe a quantidade de estoque do produto.
                            </div>`);
        }
        resposta.write(`  <label for="nf">Nome do fabricante:</label>
        <input type="text" id="nf" name="nf">
`);
        if (nf == ""){
            resposta.write(`<div class="alert alert-danger" role="alert">
                                Por favor, informe o nome do fabricante do produto.
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

app.get('/listarUsuarios', usuarioEstaAutenticado, (req,resp)=>{
    resp.write('<html>');
    resp.write('<head>');
    resp.write('<title>Resultado do cadastro</title>');
    resp.write('<meta charset="utf-8">');
    resp.write('<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">')
    resp.write('</head>');
    resp.write('<body>');
    resp.write('<h1>Lista de Produtos</h1>');
    resp.write('<table class="table table-success table-s">');
    resp.write('<tr>');
    resp.write('<th>Codigo de barras</th>');
    resp.write('<th>Descrição do produto</th>');
    resp.write('<th>Preço de custo</th>');
    resp.write(`<th>Preço de venda</th>`);
    resp.write('<th>Data de validade</th>');
    resp.write('<th>Quantidade em estoque</th>');
    resp.write('<th>Nome do fabricante</th>');
    resp.write('</tr>');
    for (let i=0; i<listaUsuarios.length; i++){
        resp.write('<tr>');
        resp.write(`<td>${listaUsuarios[i].cod}`);
        resp.write(`<td>${listaUsuarios[i].desc}`);
        resp.write(`<td>${listaUsuarios[i].pc}`);
        resp.write(`<td>${listaUsuarios[i].pv}`);
        resp.write(`<td>${listaUsuarios[i].dv}`);
        resp.write(`<td>${listaUsuarios[i].qe}`);
        resp.write(`<td>${listaUsuarios[i].nf}`);
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

app.listen(porta, host, () => {
    console.log(`Servidor rodando em http://${host}:${porta}`);
})