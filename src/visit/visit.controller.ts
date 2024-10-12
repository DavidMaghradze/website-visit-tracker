import { Controller, Get, Post, Body, Delete } from '@nestjs/common';
import { VisitService } from './visit.service';
import { UpdateVisitDto } from './dto/update-visit.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('visits')
@Controller('visit')
export class VisitController {
  constructor(private readonly visitService: VisitService) {}

  @Post('update')
  @ApiOperation({ summary: 'Update visit count for a specific country' })
  @ApiBody({
    type: UpdateVisitDto,
  })
  @ApiResponse({ status: 200, description: 'Visit count updated successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async updateVisit(@Body() updateVisitDto: UpdateVisitDto): Promise<void> {
    const { countryCode } = updateVisitDto;
    return await this.visitService.updateVisitCount(countryCode.toLowerCase());
  }

  @Get('stats')
  @ApiOperation({ summary: 'Get all country visit statistics' })
  @ApiResponse({
    status: 200,
    type: Object,
  })
  async getStats() {
    console.log('go go');
    return await this.visitService.getVisitStats();
  }

  @Delete('clear')
  @ApiOperation({ summary: 'Clear visit count for country and set to zero' })
  @ApiBody({
    type: UpdateVisitDto,
  })
  @ApiResponse({ status: 200, description: 'Visit count cleared successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async clearVisit(@Body() updateVisitDto: UpdateVisitDto) {
    return await this.visitService.clearVisitByCountry(
      updateVisitDto.countryCode.toLowerCase(),
    );
  }

  @Delete('clear-all')
  @ApiOperation({ summary: 'Clear visit count for all countries' })
  @ApiResponse({
    status: 200,
    description: 'All visit counts cleared successfully',
  })
  async clearAllVisits() {
    return await this.visitService.clearAllVisits();
  }
}
