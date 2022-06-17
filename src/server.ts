import * as http from 'http';
import users from './Users.js';
import { IUser } from './interface';

const port: number = 3000;

const server = http.createServer(async (req, res) => {
  const { url } = req;
  const pathUrl: string[] = url?.split('/') || [];
  const lengthPathUrl: number = pathUrl.length;

  if (pathUrl[1] === 'api' && pathUrl[2] === 'users') {
    if (lengthPathUrl === 3) {
      switch (req.method) {
        case 'GET':
          const allusers: IUser[] = users.getAllUsers();

          res.statusCode = 200;
          return res.end(JSON.stringify(allusers));
        default:
          break;
      }
    }
  }

  res.statusCode = 404;
  return res.end('Not Found');
}).listen(port);

export default server;
