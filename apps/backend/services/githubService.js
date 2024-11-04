import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const GITHUB_API_URL = 'https://api.github.com';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

const githubApi = axios.create({
  baseURL: GITHUB_API_URL,
  headers: {
    Authorization: `token ${GITHUB_TOKEN}`,
  },
});

export async function getGitHubUser(username, reply) {
  try {
    const { data } = await githubApi.get(`/users/${username}`);
    const { login, avatar_url, name } = data;
    return { login, avatar_url, name };
  } catch (error) {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          return reply.status(401).send({ message: 'Erro na autenticação' });
        case 403:
          return reply.status(403).send({ message: 'Acesso negado' });
        case 404:
          return reply.status(404).send({ message: 'Usuário não encontrado no GitHub' });
        default:
          return reply.status(500).send({ message: 'Erro interno no servidor GitHub' });
        }
    }
    return reply.status(500).send({ message: 'Erro interno no servidor GitCrushes' });
  }
}
