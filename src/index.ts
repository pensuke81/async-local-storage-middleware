import { Hono } from 'hono'
import { asyncLocalStorage } from './async-local-storage'
import type { Log } from './types'
import { service1 } from './service1'
import { service2 } from './service2'

const app = new Hono()

const { store } = asyncLocalStorage<Log>()

app.use(
  store((c) => ({
    requestId: crypto.randomUUID(),
    city: (c.req.raw.cf?.city ?? 'nowhere') as string
  }))
)

app.get('/', async (c) => {
  return c.json({
    service1: await service1(),
    service2: await service2()
  })
})

export default app
