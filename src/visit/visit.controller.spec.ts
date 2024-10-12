import { Test, TestingModule } from '@nestjs/testing';
import { VisitController } from './visit.controller';
import { VisitService } from './visit.service';
import { UpdateVisitDto } from './dto/update-visit.dto';

describe('VisitController', () => {
  let controller: VisitController;
  let service: VisitService;

  const mockVisitService = {
    updateVisitCount: jest.fn(),
    getVisitStats: jest.fn(),
    clearVisitByCountry: jest.fn(),
    clearAllVisits: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VisitController],
      providers: [
        {
          provide: VisitService,
          useValue: mockVisitService,
        },
      ],
    }).compile();

    controller = module.get<VisitController>(VisitController);
    service = module.get<VisitService>(VisitService);
  });

  it('should update visit count', async () => {
    const dto: UpdateVisitDto = { countryCode: 'us' };
    await controller.updateVisit(dto);
    expect(service.updateVisitCount).toHaveBeenCalledWith('us');
  });

  it('should get visit stats', async () => {
    await controller.getStats();
    expect(service.getVisitStats).toHaveBeenCalled();
  });

  it('should clear visit count by country', async () => {
    const dto: UpdateVisitDto = { countryCode: 'us' };
    await controller.clearVisit(dto);
    expect(service.clearVisitByCountry).toHaveBeenCalledWith('us');
  });

  it('should clear all visits', async () => {
    await controller.clearAllVisits();
    expect(service.clearAllVisits).toHaveBeenCalled();
  });
});
