import { container } from 'tsyringe'

import HashProviderInterface from './hashProvider/models/HashProviderInterface'
import BCryptHashProvider from './hashProvider/implementations/BCryptsHashProvider'

container.registerSingleton<HashProviderInterface>(
  'hashProvider',
  BCryptHashProvider
)