import { container } from 'tsyringe'

import DiskStorageProvider from './storageProvider/implementations/DiskStorageProvider'
import storageProviderInterface from './storageProvider/models/storageProviderInterface'

container.registerSingleton<storageProviderInterface>(
  'StorageProvider',
  DiskStorageProvider
)
