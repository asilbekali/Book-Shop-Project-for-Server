import { IsString, IsNotEmpty, IsOptional, IsNumber, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateBookDto {
  @ApiProperty({
    description: 'Book name',
    example: 'The Great Gatsby',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

}
