import cluster from 'cluster';
import { cpus } from 'os';
import process from 'process';
import server from './server.js';
import users from './Users.js';

const numCPUs = cpus().length;

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);

  // Fork workers.
  for (let i: number = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  // Workers can share any TCP connection
  // In this case it is an HTTP server
  server(users);

  console.log(`Worker ${process.pid} started`);
}
