import { container } from 'tsyringe'

import DiskStorageProvider from './storageProvider/implementations/DiskStorageProvider'
import StorageProviderInterface from './storageProvider/models/storageProviderInterface'

import IMailProvider from './mailProvider/models/MailProviderInterface'
import EtherealMailProvider from './mailProvider/implementations/EtherealMailProvider'

import IMailTemplateProvider from './mailTemplateProvider/models/iMailTemplateProvider'
import HandleBarsMailTemplateProvider from './mailTemplateProvider/implementations/HandleBarsMailTemplateProvider'

container.registerSingleton<StorageProviderInterface>(
  'StorageProvider',
  DiskStorageProvider
)

container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  HandleBarsMailTemplateProvider
)

container.registerInstance<IMailProvider>(
  'MailProvider',
  container.resolve(EtherealMailProvider)
)
