import { Test, TestingModule } from '@nestjs/testing';
import { ProductPicturesService } from './product_pictures.service';

describe('ProductPicturesService', () => {
  let service: ProductPicturesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductPicturesService],
    }).compile();

    service = module.get<ProductPicturesService>(ProductPicturesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
