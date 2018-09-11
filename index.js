const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const tasks = [];

app.post('/tasks', (request, response) => {
    const body = request.body;
    const task = {
        id: Math.random().toString().replace('0.', ''),
        title: body.title,
        resume: body.resume,
        isDone: body.isDone,
        isPriority: body.isPriority
    };
    const mensagem = 'Tarefa cadastrada com sucesso'

    tasks.push(task);
    response.status(201);
    response.send({ mensagem, task });
});

app.get('/tasks/:taskId', (request, response) => {
    const task = tasks.filter( t => t.id === request.params.taskId);
    if (task) {
        response.status(201);
        response.send(task);
    } else {
        response.status(404);
        response.send();
    }
});

app.get('/tasks', (request, response) => {
    response.send(tasks);
});

app.put('/tasks/:taskId', (request, response) => {
    const { body } = request;
    const task = tasks.find(t => t.id == request.params.taskId);
    if (task) {
        task.title = body.title; 
        task.resume = body.resume; 
        task.isDone = body.isDone; 
        task.isPriority = body.isPriority;

        const mensagem = 'Tarefa alterada com sucesso'
        response.send({ mensagem, task }); 
    } else {
        response.status(404);
        response.send(); 
    }
});

app.delete('/tasks/:taskId', (request, response) => {
      
    const task = tasks.find(t => t.id == request.params.taskId); 
    if (task) {
        tasks.pop(task);

        const mensagem = 'Tarefa excluída com sucesso'
        response.send({ mensagem, task }); 
    } else {
        response.status(404);
        response.send(); 
    }
});

app.listen(3000, () => {
    console.log('Server Running on port 3000');
});
