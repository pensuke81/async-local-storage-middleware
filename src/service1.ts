import { asyncLocalStorage } from './async-local-storage'
import { Log } from './types'

const { get } = asyncLocalStorage<Log>()

export const service1 = async () => {
  return `${get('requestId')} is from ${get('city')}`
}
