import { http, HttpResponse } from 'msw'
import type { Order } from './../../types'


export const handlers = [
  http.get('/api/menu', () => {
    return HttpResponse.json([
      { id: '1', name: 'Café Americano', price: 2.50 },
      { id: '2', name: 'Café con Leche', price: 3.00 },
      { id: '3', name: 'Capuchino', price: 3.50 },
      { id: '4', name: 'Croissant', price: 2.00 },
    ])
  }),

  http.post('/api/orders', async ({ request }) => {
    const order = await request.json() as Order
    return HttpResponse.json({ ...order, id: '123' }, { status: 201 })
  }),
]