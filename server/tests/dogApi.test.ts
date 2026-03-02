import { describe, it, expect } from 'vitest'
import request from 'supertest'

const BASE_URL = 'http://localhost:5000'

describe('Dog API (HTTP)', () => {
  it('Test 1: GET /api/dogs/random returns 200 and has expected fields', async () => {
    const res = await request(BASE_URL).get('/api/dogs/random')

    expect(res.status).toBe(200)

    expect(res.body).toHaveProperty('success', true)
    expect(res.body).toHaveProperty('data')

    expect(res.body.data).toHaveProperty('imageUrl')
    expect(typeof res.body.data.imageUrl).toBe('string')
    expect(res.body.data.imageUrl).toMatch(/^https:\/\//)

    expect(res.body.data).toHaveProperty('status')
    expect(res.body.data.status).toBe('success')
  })

  it('Test 2: Invalid endpoint returns 404 and contains error message', async () => {
    const res = await request(BASE_URL).get('/api/dogs/does-not-exist')

    expect(res.status).toBe(404)

    expect(JSON.stringify(res.body)).toMatch(/error|not found|cannot|get/i)
  })
})