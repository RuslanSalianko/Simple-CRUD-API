/* eslint-disable import/extensions */
import * as http from 'http';
import { validate as uuidValidate } from 'uuid';
import 'dotenv/config';
import { IUser, IClassUsers } from './interface';

const port: number = Number(process.env.PORT) || 3000;

function bodyParser(req: any) {
  return new Promise<string>((resolve, rejects) => {
    const body: any[] = [];
    req.on('error', (err: any) => {
      rejects(err);
    }).on('data', (chunk: string) => {
      body.push(chunk);
    }).on('end', () => {
      resolve(Buffer.concat(body).toString());
    });
  });
}

function validateAddUser(user: IUser): boolean {
  if (!Object.prototype.hasOwnProperty.call(user, 'username')
    || !Object.prototype.hasOwnProperty.call(user, 'age')
    || !Object.prototype.hasOwnProperty.call(user, 'hobbies')) {
    return false;
  }
  const { username, age, hobbies } = user;

  if (typeof username !== 'string'
    || typeof age !== 'number'
    || !Array.isArray(hobbies)) {
    return false;
  }

  return true;
}

const server = (users: IClassUsers) => {
  http.createServer(async (req, res) => {
    const { url } = req;
    const pathUrl: string[] = url?.split('/') || [];
    const lengthPathUrl: number = pathUrl.length;

    if (pathUrl[1] === 'api' && pathUrl[2] === 'users') {
      if (lengthPathUrl === 3) {
        switch (req.method) {
          case 'GET': {
            const allUsers: IUser[] = users.getAllUsers();

            res.statusCode = 200;
            return res.end(JSON.stringify(allUsers));
          }
          case 'POST':
            try {
              const user: IUser = JSON.parse(await bodyParser(req));
              const isUser: boolean = validateAddUser(user);
              if (isUser) {
                users.add(user);
                res.statusCode = 201;
                return res.end(JSON.stringify(user));
              }
              res.statusCode = 400;
              return res.end('body reqest fail');
            } catch (error) {
              res.statusCode = 500;
              return res.end('Server error');
            }
          default:
            break;
        }
      }

      if (lengthPathUrl === 4) {
        const id: string = pathUrl[3];

        if (!uuidValidate(id)) {
          res.statusCode = 400;
          return res.end('userId is invalid');
        }

        switch (req.method) {
          case 'GET': {
            const user: IUser | undefined = users.getUser(id);
            if (user) {
              res.statusCode = 200;
              return res.end(JSON.stringify(user));
            }
            res.statusCode = 404;
            return res.end('Not Found user');
          }

          case 'PUT': {
            const user: IUser | undefined = users.getUser(id);
            const newUser: IUser = JSON.parse(await bodyParser(req));
            const isUser = validateAddUser(newUser);
            if (user) {
              if (isUser) {
                users.update(id, newUser);
                res.statusCode = 200;
                return res.end(JSON.stringify(newUser));
              }
              res.statusCode = 400;
              return res.end('body reqest fail');
            }
            res.statusCode = 404;
            return res.end('Not Found user');
          }

          case 'DELETE': {
            const user: IUser | undefined = users.getUser(id);
            if (user) {
              users.delete(id);
              res.statusCode = 204;
              return res.end();
            }
            res.statusCode = 404;
            return res.end('Not Found user');
          }

          default:
            break;
        }
      }
    }
    res.statusCode = 404;
    return res.end('Not Found');
  }).listen(port);
};

export default server;
