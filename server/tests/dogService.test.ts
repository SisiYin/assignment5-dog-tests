import { describe, it, expect, vi, afterEach } from 'vitest';
import { getRandomDogImage } from '../services/dogService'; 

global.fetch = vi.fn(); 

describe('Dog Service Tests', () => {

  afterEach(() => {
    vi.clearAllMocks(); 
  });

  it('Test 1: should return dog image on successful fetch', async () => {
    const mockData = {
      message: "https://images.dog.ceo/breeds/terrier-welsh/lucy.jpg",
      status: "success"
    };

    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const result = await getRandomDogImage();

    expect(global.fetch).toHaveBeenCalledOnce(); 
    expect(result.imageUrl).toBe("https://images.dog.ceo/breeds/terrier-welsh/lucy.jpg"); 
    expect(result.status).toBe("success"); 
  });


  it('Test 2: should throw an error on failed fetch', async () => {
    (global.fetch as any).mockResolvedValueOnce({
      ok: false,
      status: 500
    });

    await expect(getRandomDogImage()).rejects.toThrow("Failed to fetch dog image");
  });

});