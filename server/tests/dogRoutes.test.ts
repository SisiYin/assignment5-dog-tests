import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import express from 'express';
import * as dogController from '../controllers/dogController'; 
import dogRoutes from '../routes/dogRoutes'; 

vi.mock('../controllers/dogController');

const app = express();
app.use(express.json());
app.use('/api/dogs', dogRoutes); 
app.use('/api/dog', dogRoutes); 

describe('Dog Routes Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('Test 4: should return 200 and mocked dog image JSON', async () => {
    (dogController.getDogImage as any).mockImplementation((_req: any, res: any) => {
      res.status(200).json({
        success: true,
        data: {
          imageUrl: "https://images.dog.ceo/breeds/stbernard/n02109525_15579.jpg",
          status: "success"
        }
      });
    });

    const response = await request(app).get('/api/dogs/random');

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.imageUrl).toBe("https://images.dog.ceo/breeds/stbernard/n02109525_15579.jpg");
  });

  it('Test 5: should return 500 and error message', async () => {
    (dogController.getDogImage as any).mockImplementation((_req: any, res: any) => {
      res.status(500).json({
        success: false,
        error: "Failed to fetch dog image: Network error"
      });
    });

    const response = await request(app).get('/api/dog/random');

    expect(response.status).toBe(500);
    expect(response.body.error).toBe("Failed to fetch dog image: Network error");
  });

});