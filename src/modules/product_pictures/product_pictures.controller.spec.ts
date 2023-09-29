import { Test, TestingModule } from '@nestjs/testing';
import { ProductPicturesController } from './product_pictures.controller';
import { ProductPicturesService } from './product_pictures.service';

describe('ProductPicturesController', () => {
  let controller: ProductPicturesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductPicturesController],
      providers: [ProductPicturesService],
    }).compile();

    controller = module.get<ProductPicturesController>(
      ProductPicturesController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
