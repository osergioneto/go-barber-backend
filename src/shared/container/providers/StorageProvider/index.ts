import { container } from 'tsyringe';

import IStorageProvider from './models/IStorageProvider';

import DiskStorageProvider from './implementations/DiskStorageProvider';

const providers = {
  etherdiskeal: DiskStorageProvider,
};

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
);
