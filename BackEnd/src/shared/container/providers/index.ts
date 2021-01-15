import { container } from 'tsyringe'

import DiskStorageProvider from './storageProvider/implementations/DiskStorageProvider'
import StorageProviderInterface from './storageProvider/models/storageProviderInterface'
// import IMailProvider from './mailProvider/models/MailProviderInterface'

container.registerSingleton<StorageProviderInterface>(
  'StorageProvider',
  DiskStorageProvider
)
