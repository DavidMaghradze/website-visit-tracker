import { Injectable } from '@nestjs/common';
import { VisitStatsResponse } from './types/visit-stats.types';
import { RedisService } from '@/redis/redis.service';

@Injectable()
export class VisitService {
  constructor(private readonly redisService: RedisService) {}

  private get redisClient() {
    return this.redisService.getClient();
  }

  async updateVisitCount(countryCode: string): Promise<void> {
    await this.redisClient.hincrby('visits', countryCode, 1);
  }

  async getVisitStats(): Promise<VisitStatsResponse> {
    const stats = await this.redisClient.hgetall('visits');

    // Convert the string values to numbers
    const formattedStats = {};
    for (const country in stats) {
      formattedStats[country] = parseInt(stats[country]);
    }

    return formattedStats;
  }

  async clearVisitByCountry(countryCode: string): Promise<void> {
    await this.redisClient.hdel('visits', countryCode);
  }

  async clearAllVisits(): Promise<void> {
    await this.redisClient.del('visits');
  }
}
