import { Module } from '@nestjs/common';
import { VisitService } from './visit.service';
import { VisitController } from './visit.controller';
import { RedisService } from '@/redis/redis.service';

@Module({
  controllers: [VisitController],
  providers: [VisitService, RedisService],
})
export class VisitModule {}
