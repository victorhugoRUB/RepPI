import express from 'express';

const app = express();
const host = '0.0.0.0';
const porta = 3000;

function paginaInicial(req, res){
    res.send(`<!DOCTYPE html>
    <html lang="pt-br">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Seja bem vindo a minha primeira aplicação</title>
    </head>
    <body>
        <h1>Hello World</h1>
    </body>
    </html>`)
    res.end();
}

function gerarPaginaTabuada(req, res){
    try{
        let numero = Number(req.query.numero);
        let qnt = Number(req.query.sequencia);
        if(isNaN(numero)){
            throw new Error('ERRO [400] - Os valores informados não são números válidos')
        }
        if(isNaN(qnt)){
            qnt = 10;
        }
        let conteudoResposta = `
        <!DOCTYPE html>
        <html lang="pt-br">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Tabuada do numero ${numero}</title>
        </head>
        <body>
            <h1>Tabuada do numero ${numero}</h1>
            <ul>
        `
        for(let i=0;i<qnt+1;i++){
            const linha = `<li>${numero} multiplicado por ${i} = ${numero*i}</li>`
            conteudoResposta += linha;
        }
        conteudoResposta+=`
            </ul>
        </body>
        </html>
        `
        res.end(conteudoResposta)
    } catch(erro){
        res.end(`
        <!DOCTYPE html>
        <html lang="pt-br">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Erro</title>
        </head>
        <body>
            <h1>Não foi possível processar a sua requisição</h1>
            <h2>Erro ao tentar gerar os resultados</h2>
            <h2>Na barra de endereço digite: (http://http://localhost:3000/tabuada?numero=2&sequencia=10) por exemplo.</h2>
            <h3>${erro.message}</h3>
        </body>
        </html>`)
        return;
    }
}

app.get('/', paginaInicial)
app.get('/tabuada', gerarPaginaTabuada)

app.listen(porta, host, () =>{
    console.log(`Servidor executando em http://${host}:${porta}.`);
});