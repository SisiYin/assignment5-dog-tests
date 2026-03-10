import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getDogImage } from '../controllers/dogController'; 
import * as dogService from '../services/dogService'; 

vi.mock('../services/dogService');

describe('Dog Controller Tests', () => {
  let req: any;
  let res: any;

  beforeEach(() => {
    req = {};
    res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    };
    vi.clearAllMocks();
  });

  it('Test 3: should return success true and mocked JSON', async () => {
    const mockedServiceResponse = {
      imageUrl: "https://images.dog.ceo/breeds/terrier-welsh/lucy.jpg",
      status: "success"
    };

    (dogService.getRandomDogImage as any).mockResolvedValue(mockedServiceResponse);

    await getDogImage(req, res);

    expect(res.json).toHaveBeenCalledWith({
      success: true,
      data: mockedServiceResponse
    });
  });

});