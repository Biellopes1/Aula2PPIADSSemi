import express from 'express';
import path from 'path';
const porta = 3000;
const host = '0.0.0.0' // todas as placas de rede do pc
var ListarProdutos = [];
const app = express();

app.use(express.static('./publico'));
//define as funcionalidades do servidor acessiveis por endpoints(rotas)

//Declarar ao express onde esta a fonte dos arquivos estaticos
app.use('/cadastroProduto', (req, resp) => {
    //extraindo os dados escolhidos do formulario pela name="".
    const versao = req.query.versao;
    const marca = req.query.marca;
    const custo = req.query.custo;
    const produto = req.query.produto;

    //adicionando um novo produto a lista
    ListarProdutos.push({
        versao: versao,
        marca: marca,
        custo: custo,
        produto: produto
    })
    resp.write('<!DOCTYPE html>');
    resp.write('<html>');
    resp.write('<head>');
    resp.write('<meta charset="UTF-8">');
    resp.write('<title>Resultados</title>');
    resp.write('</head>');
    resp.write('<body>');
    resp.write(`<h3>Produto ${versao} ${marca} cadastrado com Sucesso!</h3>`);
    resp.write('<br>')
    resp.write('<button><a href="/">Voltar</a></button>');
    resp.write('<br>');
    resp.write('<br>')
    resp.write('<button><a href="/ListarProdutos">Listar Produtos</a></button>');
    resp.write('<br>');
    resp.write('</body>');
    resp.write('</html>');
    resp.end();
});

app.use('/ListarProdutos', (req, resp) => {
    resp.write('<!DOCTYPE html>');
    resp.write('<html>');
    resp.write('<head>');
    resp.write('<meta charset="UTF-8">');
    resp.write('<title>Lista de Produtos</title>');
    resp.write('<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">')
    resp.write('</head>');
    resp.write('<body>');
    resp.write('<h3>Produtos Cadastrados</h3>');
    resp.write('<table class="table table-dark table-striped">');
    resp.write('<tr>');
    resp.write('<th>Versão</th>');
    resp.write('<th>Marca</th>');
    resp.write('<th>Custo</th>');
    resp.write('<th>Categoria</th>');
    resp.write('</tr>');

    for (let i = 0; i < ListarProdutos.length; i++) {
        resp.write('<tr>');
        resp.write(`<td>${ListarProdutos[i].versao}</td>`);
        resp.write(`<td>${ListarProdutos[i].marca}</td>`);
        resp.write(`<td>R$ ${ListarProdutos[i].custo}</td>`);
        resp.write(`<td>${ListarProdutos[i].produto}</td>`);
        resp.write('</tr>');
    }

    resp.write('</table>');
    resp.write('<button><a href="/index.html">Voltar</a></button>');
    resp.write('</body>');
    resp.write('<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>')
    resp.write('</html>');
    resp.end();
});



app.use(express.static(path.join(process.cwd(),'/Publico')));

app.listen(porta, host, () => {
    console.log(`Servidor executando na porta http://${host}:${porta}`);
})