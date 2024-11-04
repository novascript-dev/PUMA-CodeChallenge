import path from 'path'
import AutoLoad from '@fastify/autoload'
import cors from '@fastify/cors';
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Pass --options via CLI arguments in command to enable these options.
export const options = {}

export default async function (fastify, opts) {
  // Place here your custom code!
  fastify.register(cors, {
    origin: '*', // Permite acesso de qualquer origem (ajuste conforme necessário)
    methods: ['GET', 'POST', 'DELETE', 'PATCH'], // Métodos permitidos
    allowedHeaders: ['Content-Type'], // Cabeçalhos permitidos
  });

  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, opts)
  })

  // This loads all plugins defined in routes
  // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: Object.assign({}, opts)
  })
}
