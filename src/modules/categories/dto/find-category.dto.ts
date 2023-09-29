import { ApiProperty } from '@nestjs/swagger';

export class FindCategoryDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  active: string;

  @ApiProperty()
  avatar: string;
}
