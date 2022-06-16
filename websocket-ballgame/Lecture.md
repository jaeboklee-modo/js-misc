## Agenda

1. Connect to Server
2. Create Game
3. Join Game
4. Play
5. Broadcast State
6. Full Game Example
7. Code

### Connect

클라이언트가 NodeJS 웹소켓서버에 커넥트를 한다.
JSON으로 소통을 할 예정. 그러나 그건 너 마음이다.

Connect()를 하려고 하면, Response는 클라이언트의 유니크한 id가 온다.
=> 해시테이블, guid가 필요하다.
JSON으로 해당 데이터가 전송됨.

### Create Game

게임을 만들기 위한 요청을 만들 수 있다.
client : request에 createGame 이라는 method를 보내고 이 때 clientId도 같이 보낸다. 누가 만드는지!
server : 게임의 ID를 만들고, response로 gameID를 리턴.

### Join Game

gameID를 통해 다른 client가 join을 할 수 있다.
client : joinGame method로, clientId, gameId 를 같이 보낸다.
server : gameId, balls, clients[guid, color]를 리턴한다.

### Play

게임을 플레이 할 수 있다.
client : playGame method로, clientId, gameId, ballId를 같이 보낸다. ballId : 어떤거 칠할래?
server : response 없음.
특징 : 사람들이 이 메소드를 다다다 실행할 것이기 때문에 아주 빠르게 반응을 해야 한다.

### Brodcast State

웹소켓 서버는 여러 클라이언트에게 보낸다. batching이라고 함.
하나의 final game state를 여러 client에게 보냄.
server : updateGame 으로, gameId, state[ball, color] 를 클라이언트에게 보냄. 그러면 클라이언트에서는 이걸 받아서 화면에 표시되는 state를 바꾼다.

### Play and Broadcast

클라이언트가 state를 보내면 서버는 이걸 받아서

// Lock step approach?

### Join Game

1. A가 게임을 만든다.
2. B가 게임에 들어간다.
3. C가 게임에 들어간다 => B, C 둘 다 에게 보낸다.
4. A가 게임에 들어간다 => A, B, C 셋 모두에게 들어갔다는걸 보낸다.

### Play Game

1.  1. A가 게임 Z 의 6 번 볼을 플레이하는 리퀘스트를 보낸다.
    2. 6번 볼을 A의 컬러로 바꾼다.(서버의 상태가 바뀜)

2.  1. B가 게임 Z 의 7 번 볼을 플레이하는 리퀘스트를 보낸다.
    2. 7번 볼을 B의 컬러로 바꾼다.

3.  1.
