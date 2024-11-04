import { getGitHubUser } from '../services/githubService.js';
import { users, saveUser, MAX_USERS } from '../services/usersService.js';

const postUsersSchema = {
    type: 'object',
    properties: {
        username: { type: 'string' }
    },
    required: ['username']
};

export default async function (fastify, opts) {
    fastify.post('/users', {
        schema: {
            body: postUsersSchema
        }
    }, async (request, reply) => {
        const { username } = request.body;

        if (users[username]) {
            return reply.status(409).send({ message: 'Usuário já está na lista de favoritos' });
        }
        if (Object.keys(users).length >= MAX_USERS) {
            return reply.status(403).send({ message: 'Limite de 5 usuários favoritos atingido' });
        }

        const gitHubUser = await getGitHubUser(username, reply);
        return reply.status(201).send(saveUser(gitHubUser));
    })

    fastify.get('/users', async (request, reply) => {
      return Object.values(users)
    })

    fastify.delete('/users/:username', async (request, reply) => {
        const { username } = request.params;
        
        if (!users[username]) {
          return reply.status(404).send({ message: 'Usuário não encontrado' });
        }
        
        delete users[username];
        
        return reply.status(204).send({ message: 'Usuário deletado' });
    });
}