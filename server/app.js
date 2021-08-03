// importação de dependência(s)
import express from "express"
import { readFile } from "fs/promises"
import hbs from "hbs"

// variáveis globais deste módulo
const PORT = 3000
const db = {}
const app = express(); 
const clientDir = "./client";

// carregar "banco de dados" (data/jogadores.json e data/jogosPorJogador.json)
// você pode colocar o conteúdo dos arquivos json no objeto "db" logo abaixo
// dica: 1-4 linhas de código (você deve usar o módulo de filesystem (fs))
db.jogadores = JSON.parse(await readFile("./server/data/jogadores.json"));
db.jogosPorJogador = JSON.parse(await readFile("./server/data/jogosPorJogador.json"));

// configurar qual templating engine usar. Sugestão: hbs (handlebars)
// dica: 2 linhas
app.set("view engine", "hbs");
app.set("views", "./server/views");


// EXERCÍCIO 2
// definir rota para página inicial --> renderizar a view index, usando os
// dados do banco de dados "data/jogadores.json" com a lista de jogadores
// dica: o handler desta função é bem simples - basta passar para o template
//       os dados do arquivo data/jogadores.json (~3 linhas)
app.get("/", function(request, response) {
    response.render("index", db);     
});



// EXERCÍCIO 3
// definir rota para página de detalhes de um jogador --> renderizar a view
// jogador, usando os dados do banco de dados "data/jogadores.json" e
// "data/jogosPorJogador.json", assim como alguns campos calculados
// dica: o handler desta função pode chegar a ter ~15 linhas de código
app.get("/jogador/:id", function(request, response) {
    const profile = db.jogadores.players.filter(player => {
        return player.steamid === request.params.id;
    });
    const gameInfo = db.jogosPorJogador[request.params.id];
    gameInfo.games.sort((a, b) => b.playtime_forever - a.playtime_forever);
    //console.log(gameInfo.games[0], gameInfo.games[1], gameInfo.games[30])

    response.render("jogosPorJogador", db);     
});


// EXERCÍCIO 1
// configurar para servir os arquivos estáticos da pasta "client"
// dica: 1 linha de código
app.use(express.static(`${clientDir}`));

// abrir servidor na porta 3000 (constante PORT)
// dica: 1-3 linhas de código
app.listen(3000, () => {
    console.log("Listening in: http://localhost:3000");
 })

