const { response } = require("express");
const http = require("http");
const app = require("express")();
app.get("/", (req, res) => res.sendFile(__dirname + "/index.html"));

app.listen(9091, () => console.log("Listening on 9091"));
const websocketServer = require("websocket").server;
const httpServer = http.createServer();
httpServer.listen(9090, () => console.log("Listen on 9090"));

// hashmap clients
const clients = {};
const games = {};

const wsServer = new websocketServer({
  httpServer: httpServer,
});
wsServer.on("request", (request) => {
  // connect
  const connection = request.accept(null, request.origin);
  connection.on("open", () => console.log("opened"));
  connection.on("close", () => console.log("closed"));
  connection.on("message", (message) => {
    const result = JSON.parse(message.utf8Data);
    // I have received a message from the client

    console.log("result:", result);

    // user want to create a new game
    if (result.method === "create") {
      // how are you?
      const clientId = result.clientId;
      console.log("clientId:", clientId);

      const gameId = guid();
      games[gameId] = {
        id: gameId,
        balls: 20, // hardcoded
        clients: [],
      };

      const payLoad = {
        method: "create",
        game: games[gameId],
      };

      console.log("gameId:", gameId);

      const con = clients[clientId].connection;
      con.send(JSON.stringify(payLoad));
    }

    // client want to join
    if (result.method === "join") {
      const clientId = result.clientId;
      const gameId = result.gameId;

      console.log("client id, game id: ", clientId, gameId);

      const game = games[gameId];

      if (game.clients.length >= 3) {
        // max player reach
        console.log("max player reach");
        return;
      }

      const color = { 0: "Red", 1: "Green", 2: "Blue" }[game.clients.length];
      game.clients.push({
        clientId: clientId,
        color: color,
      });

      // start the game if participants are 3.
      if (game.clients.length === 3) updateGameState();

      const payLoad = {
        method: "join",
        game: game,
      };

      game.clients.forEach((client) => {
        clients[client.clientId].connection.send(JSON.stringify(payLoad));
      });
    }

    // user payer
    if (result.method === "play") {
      const clientId = result.clientId;
      const gameId = result.gameId;
      const ballId = result.ballId;
      const color = result.color;

      let state = games[gameId].state;

      if (!state) {
        state = {};
      }

      state[ballId] = color;
      games[gameId].state = state;

      const game = games[gameId];

      const payLoad = {
        method: "play",
        game: game,
      };
    }
  });

  // generate a new client id
  const clientId = guid();
  clients[clientId] = { connection: connection };
  console.log("create new client id, the connection is set.", connection);

  const payLoad = {
    method: "connect",
    clientId: clientId,
  };

  // send back the client connect
  connection.send(JSON.stringify(payLoad));
});

function updateGameState() {
  // loop all the games and send each client the state of the game

  for (const g of Object.keys(games)) {
    const game = games[g];
    const payLoad = {
      method: "update",
      game: game,
    };

    games[g].clients.forEach((c) => {
      clients[c.clientId].connection.send(JSON.stringify(payLoad));
    });
  }

  // It runs every 500ms.
  setTimeout(updateGameState, 500);
}

function S4() {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}

// then to call it, plus stitch in '4' in the third group
const guid = () =>
  (
    S4() +
    S4() +
    "-" +
    S4() +
    "-4" +
    S4().substr(0, 3) +
    "-" +
    S4() +
    "-" +
    S4() +
    S4() +
    S4()
  ).toLowerCase();
