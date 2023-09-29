import { ApiProperty } from '@nestjs/swagger';

export class FindProductDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  avatar: string;

  @ApiProperty()
  des: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  categoryId: string;
}
