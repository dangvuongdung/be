import { ApiProperty } from '@nestjs/swagger'
import { IsDefined, IsNotEmpty, IsOptional } from 'class-validator'

export class LoginDto {
    @ApiProperty({
        example: `Wallet address: @address@\n\nTimestamp: @timestamp@`,
        required: true,
        description: 'Template for sign',
    })
    @IsDefined()
    template: string

    @ApiProperty({
        example: '0xabc0000000000000000000000000000000000000',
        required: true,
        description: 'address as lower case',
    })
    @IsDefined()
    address: string

    @ApiProperty({
        example: 1675073500,
        required: true,
        description: 'current timestamp (seconds)',
    })
    @IsDefined()
    timestamp: number

    @ApiProperty({
        required: true,
        description: 'signature from metamask',
    })
    @IsDefined()
    signature: string
}

export class RefreshTokenDto {
    @ApiProperty({
        example: '0xabc0000000000000000000000000000000000000',
        required: true,
        description: 'address as lower case',
    })
    @IsDefined()
    @IsNotEmpty()
    address: string

    @ApiProperty({
        required: true,
        description: 'Refresh token',
    })
    @IsDefined()
    @IsNotEmpty()
    refreshToken: string
}

export class UpdateProfileDto {
    @ApiProperty({ required: true })
    @IsDefined()
    name: string

    @ApiProperty({ required: true })
    @IsDefined()
    avt: string
}
