# Web Worker

Web Workers são mecanismos que permitem que uma operação de um dado script seja executada em uma thread diferente da thread principal da aplicação Web `Main thread`. Permitindo que cálculos laboriosos sejam processados sem que ocorra bloqueio da thread principal (geralmente associado à interface).

![Web Worker](./images/worker.png)

## Exemplo de Código

Aqui está um exemplo simples de como criar um Web Worker:

```javascript
// main.js
const worker = new Worker('worker.js');

worker.onmessage = function(event) {
    console.log('Mensagem do worker:', event.data);
};

worker.postMessage('Olá, Worker!');
```

```javascript
// worker.js
onmessage = function(event) {
    console.log('Mensagem do main thread:', event.data);
    postMessage('Olá, Main Thread!');
};
```

Os Web Workers são uma parte essencial do desenvolvimento web moderno, permitindo que os desenvolvedores realizem tarefas em segundo plano, melhorando a performance e a responsividade das aplicações. Ao utilizar Web Workers, é possível realizar operações pesadas sem bloquear a interface do usuário, proporcionando uma experiência mais fluida e interativa. 

## Links úteis

- [documentação MDN](https://developer.mozilla.org/pt-BR/docs/Web/API/Web_Workers_API#:~:text=Web%20Workers%20s%C3%A3o%20mecanismos%20que,(geralmente%20associado%20%C3%A0%20interface).)

- [Como usar web workers do lado do cliente e do servidor](https://blog.openreplay.com/how-to-use-client-and-server-side-web-workers/)