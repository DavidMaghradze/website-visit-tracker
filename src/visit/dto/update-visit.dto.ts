import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class UpdateVisitDto {
  @ApiProperty({
    description: 'The country code for the visit (e.g., us, ru, it)',
    example: 'us',
  })
  @IsNotEmpty({ message: 'Country code is required' })
  @IsString()
  @Matches(/^[A-Za-z]{2}$/, {
    message: 'countryCode must be a valid ISO 3166-1 alpha-2 country code',
  })
  countryCode: string;
}
