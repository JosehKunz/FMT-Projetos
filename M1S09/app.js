const express = require('express');
const app = express();

  //Exercício 5
  app.use(express.static('public'));


// Middleware (Exercício 3)
app.use((req, res, next) => {
    const now = new Date();
    console.log(`[${now.toISOString()}] ${req.method} ${req.url}`);
    next();
  });


// Exercício 1 e 2
app.get('/', (req, res) => {
  res.send('Servidor Rodando Liso!');
});

app.listen(3000, () => {
  console.log('Servidor rodando em  http://localhost:3000');
});

app.get('/sobre', (req, res) => {
    res.send('Este é o Aplicativo de José Kunz feito para a aula de Floripa Mais Tech sobre Express');
  });
  
  app.get('/contato', (req, res) => {
    res.send('Atenção visitante: você pode entrar em contato comigo via josekunz@gmail.com!');
  });


  // Exercício 4
  app.get('/produto/:id', (req, res) => {
    const idProduto = req.params.id;
    res.send(`O Produto que você solicitou tem o ID: ${idProduto}`);
  });


// Exercício 6 (CRUD)

const yup = require('yup');

// Esquema de Validação
const userSchema = yup.object().shape({
  nome: yup.string().required(),
  email: yup.string().email().required(),
});

        //Criação
        app.post('/users', async (req, res) => {
            try {
            // Validar o corpo da solicitação usando o esquema definido
            const validatedUser = await userSchema.validate(req.body, { abortEarly: false });
        
            // Se a validação for bem-sucedida, adicione o usuário (aqui, apenas simulamos a adição)
            validatedUser.id = users.length + 1;
            users.push(validatedUser);
        
            res.status(201).send(validatedUser);
            } catch (error) {
            // Se a validação falhar, retorne um erro 400 com os detalhes
            res.status(400).send(error.errors);
            }
        });

        //Leitura
        //Lista Completa
        app.get('/users', (req, res) => {
            res.status(200).send(users);
          });
        //Detalhes Específicos
        app.get('/users/:id', (req, res) => {
            const id = parseInt(req.params.id);
            const user = users.find(u => u.id === id);
          
            if (!user) {
              return res.status(404).send('Usuário não foi encontrado.');
            }
          
            res.status(200).send(user);
          });


        // Update
        app.put('/users/:id', async (req, res) => {
            const userId = parseInt(req.params.id);
            const userIndex = users.findIndex(u => u.id === userId);
          
            if (userIndex === -1) {
              return res.status(404).send('Usuário não foi encontrado.');
            }
          
            try {
              const updatedUserData = await userSchema.validate(req.body, { abortEarly: false });
              const updatedUser = { ...users[userIndex], ...updatedUserData, id: userId };
              users[userIndex] = updatedUser;
              res.status(200).send(updatedUser);
            } catch (error) {
              res.status(400).send(error.errors);
            }
          });

          // Exclusão
          app.delete('/users/:id', (req, res) => {
            const userId = parseInt(req.params.id);
            const userIndex = users.findIndex(u => u.id === userId);
          
            if (userIndex === -1) {
              return res.status(404).send('Usuário não foi encontrado.');
            }
            // Remove o usuário do array
            users.splice(userIndex, 1);
            res.status(200).send(`Usuário de ID ${userId} foi com sucesso.`);
          });

  

  
