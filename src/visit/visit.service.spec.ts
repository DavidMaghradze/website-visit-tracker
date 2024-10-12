import { Test, TestingModule } from '@nestjs/testing';
import { VisitService } from './visit.service';
import Redis from 'ioredis';
import { RedisService } from '@/redis/redis.service';

describe('VisitService', () => {
  let service: VisitService;
  let redisClient: Redis;

  afterAll(async () => {
    await redisClient.quit(); // Close the Redis connection
  });

  beforeEach(async () => {
    redisClient = new Redis();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RedisService,
        VisitService,
        {
          provide: 'REDIS_CLIENT',
          useValue: redisClient,
        },
      ],
    }).compile();

    service = module.get<VisitService>(VisitService);
  });

  afterEach(async () => {
    await redisClient.flushall(); // Clear all data after each test
  });

  it('should update visit count', async () => {
    await service.updateVisitCount('us');
    const count = await redisClient.hget('visits', 'us');
    expect(count).toBe('1');
  });

  it('should retrieve visit statistics', async () => {
    await service.updateVisitCount('us');
    await service.updateVisitCount('ru');
    const stats = await service.getVisitStats();
    expect(stats).toEqual({ us: 1, ru: 1 });
  });

  it('should clear visit count by country', async () => {
    await service.updateVisitCount('us');
    await service.clearVisitByCountry('us');
    const count = await redisClient.hget('visits', 'us');
    expect(count).toBe(null);
  });

  it('should clear all visits', async () => {
    await service.updateVisitCount('us');
    await service.updateVisitCount('ru');
    await service.clearAllVisits();
    const usCount = await redisClient.hget('visits', 'us');
    const ruCount = await redisClient.hget('visits', 'ru');
    expect(usCount).toBe(null);
    expect(ruCount).toBe(null);
  });
});
