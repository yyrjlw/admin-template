import { setupWorker } from 'msw';
import user from './user';
import { Connection, DATA_TYPE } from 'jsstore';
import workerInjector from 'jsstore/dist/worker_injector';
import type { ITable } from 'jsstore';

const handlers = [...user];
export const worker = setupWorker(...handlers);

export const dbConnection = new Connection();
dbConnection.addPlugin(workerInjector);

export const dbTables = {
  adminUser: 'adminUser',
};

function getTables() {
  const adminUser = {
    name: dbTables.adminUser,
    columns: {
      id: {
        primaryKey: true,
        autoIncrement: true,
      },
      userName: {
        notNull: true,
        dataType: DATA_TYPE.String,
      },
      avatar: {
        dataType: DATA_TYPE.String,
      },
      notifyCount: {
        dataType: DATA_TYPE.Number,
      },
      unreadCount: {
        dataType: DATA_TYPE.Number,
      },
      permissions: {
        notNull: true,
        dataType: DATA_TYPE.Array,
      },
      phone: {
        dataType: DATA_TYPE.String,
      },
    },
  };
  return [adminUser] as ITable[];
}

function initDataBase() {
  dbConnection.insert({
    into: dbTables.adminUser,
    values: [
      {
        userName: 'admin',
        avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
        notifyCount: 12,
        unreadCount: 11,
        permissions: ['list:list', 'admin:list'],
        phone: '0752-268888888',
      },
    ] as API.CurrentUser[],
  });
}

async function setUpJsStore() {
  await dbConnection.initDb({
    name: 'mock',
    tables: getTables(),
  });
  initDataBase();
}
setUpJsStore();
