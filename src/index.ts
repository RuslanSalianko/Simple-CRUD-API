import cluster from 'cluster';
import { cpus } from 'os';
import process from 'process';
import server from './server.js';
import users from './Users.js';

const numCPUs = cpus().length;

if (cluster.isPrimary) {
  process.stdout.write(`Primary ${process.pid} is running`);

  // Fork workers.
  for (let i: number = 0; i < numCPUs; i += 1) {
    cluster.fork();
  }

  cluster.on('exit', (worker) => {
    process.stdout.write(`worker ${worker.process.pid} died`);
  });
} else {
  // Workers can share any TCP connection
  // In this case it is an HTTP server
  server(users);

  process.stdout.write(`Worker ${process.pid} started`);
}
