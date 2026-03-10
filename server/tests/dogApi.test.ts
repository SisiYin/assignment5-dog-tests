import { describe, it, expect } from 'vitest';
import request from 'supertest';
import express from 'express';
import dogRoutes from '../routes/dogRoutes';

const app = express();
app.use(express.json());
app.use('/api/dogs', dogRoutes);
app.use((_req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
});

describe('API Tests', () => {
  // Test 1: Positive API test to get a random dog image
  it('Test 1: should get a random dog image', async () => {
    // Send request to the API endpoint to get a random dog image
    const response = await request(app).get('/api/dogs/random');
    // Check HTTP status code
    expect(response.status).toBe(200);
    // Verify success flag
    expect(response.body.success).toBe(true);
    // Verify returned data exists
    expect(response.body.data).toBeDefined();
    // Verify image URL exists
    expect(response.body.data.imageUrl).toBeDefined();
    // Verify image URL is a string
    expect(typeof response.body.data.imageUrl).toBe('string');
  });

  // Test 2: Negative API test
  it('Test 2: should return 404 for invalid route', async () => {
    // Send request to invalid endpoint 
    const response = await request(app).get('/api/dogs/invalid');

    // Check HTTP status code
    expect(response.status).toBe(404);
    // Verify error message exists
    expect(response.body.error).toBeDefined();
    // Verify error message content
    expect(response.body.error).toBe('Route not found');
  });
});