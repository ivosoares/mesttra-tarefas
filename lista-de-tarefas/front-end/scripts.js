const listaTarefasHtml = document.getElementById('tarefas');
console.log(listaTarefasHtml);

// FETCH API - USADO PARA TRABALHAR COM REQUISICOES HTTP COM JAVASCRIPT (GET/POST/PUT/DELETE)
// Primeiro parametro - End pont da requisicao (Para onde iremos enviar a nossa requisicao do front))
//(https://localhost:3000/tarefas)
// Segundo Parametro (opcional) - Configuraçoes da requisicao Ex: Metodo (GET/POST/PUT/DELETE)

// FUNCAO ASSINCRONA (PROMISSE)
const Api = fetch('http://localhost:3000/tarefas');
console.log(Api);

Api.then((response) => {
  console.log(response);
  return response.json()
}).then((tarefas) => {
  console.log(tarefas);
  tarefas.map((tarefa) => {
    console.log(tarefa);
    listaTarefasHtml.insertAdjacentHTML('beforeend', `<li>
      <p>Tarefa: ${tarefa.text}</p>
      <p>Prazo: ${tarefa.prazo}</p>
    </li>`)
  })
})