import { rest } from 'msw';
import { getResponseData } from './util';
import { dbConnection, dbTables } from './browser';

export default [
  rest.get('/api/currentUser', async (req, res, ctx) => {
    const loggedUser = sessionStorage.getItem('loggedUser');
    if (!loggedUser) {
      return res(ctx.status(401), ctx.json(getResponseData(null, 401, '无权限！')));
    }

    return res(ctx.json(getResponseData(JSON.parse(loggedUser))));
  }),
  rest.post('/api/login/account', async (req, res, ctx) => {
    const { password, username } = await req.json();
    const result = await dbConnection.select<API.CurrentUser>({
      from: dbTables.adminUser,
      where: {
        userName: username,
      },
      limit: 1,
    });
    if (result.length) {
      if (password === 'ant.design') {
        sessionStorage.setItem('loggedUser', JSON.stringify(result[0]));
        return res(
          ctx.json(
            getResponseData({
              token: 'bwbfewrgerg2e65g4rt654hwtrwhtrhrt',
            }),
          ),
        );
      }
    }

    return res(ctx.json(getResponseData(null, 401, '用户名或密码错误')));
  }),
];

// 代码中会兼容本地 service mock 以及部署站点的静态数据
/* export const a = {
  // GET POST 可省略
  'GET /api/users': [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
  ],
  'POST /api/login/outLogin': (req: Request, res: Response) => {
    access = '';
    res.send({ data: {}, success: true });
  },
  'POST /api/register': (req: Request, res: Response) => {
    res.send({ status: 'ok', currentAuthority: 'user', success: true });
  },
  'GET /api/500': (req: Request, res: Response) => {
    res.status(500).send({
      timestamp: 1513932555104,
      status: 500,
      error: 'error',
      message: 'error',
      path: '/base/category/list',
    });
  },
  'GET /api/404': (req: Request, res: Response) => {
    res.status(404).send({
      timestamp: 1513932643431,
      status: 404,
      error: 'Not Found',
      message: 'No message available',
      path: '/base/category/list/2121212',
    });
  },
  'GET /api/403': (req: Request, res: Response) => {
    res.status(403).send({
      timestamp: 1513932555104,
      status: 403,
      error: 'Forbidden',
      message: 'Forbidden',
      path: '/base/category/list',
    });
  },
  'GET /api/401': (req: Request, res: Response) => {
    res.status(401).send({
      timestamp: 1513932555104,
      status: 401,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },

  // 'GET  /api/login/captcha': getFakeCaptcha,
}; */
