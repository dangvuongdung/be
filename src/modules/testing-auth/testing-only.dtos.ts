import { ApiProperty } from '@nestjs/swagger'
import { IsDefined, IsOptional } from 'class-validator'

export class SignTypedDataV4Dto {
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
        description: 'private key',
    })
    @IsDefined()
    privateKey: string
}

export class RecoverTypedSignatureV4Dto {
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

export class PersonalSignDto {
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
        description: 'private key',
    })
    @IsDefined()
    privateKey: string
}

export class RecoverPersonalSignDto {
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
        required: false,
        description: 'referral code',
    })
    @IsOptional()
    referral_code: string

    @ApiProperty({
        required: true,
        description: 'signature from metamask',
    })
    @IsDefined()
    signature: string
}

export class PersonalSignWithReferralCodeDto {
    @ApiProperty({
        example: `Wallet address: @address@\n\nTimestamp: @timestamp@\n\nReferralCode: @referral_code@`,
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
    })
    @IsDefined()
    referral_code: string

    @ApiProperty({
        required: true,
        description: 'private key',
    })
    @IsDefined()
    privateKey: Buffer
}

export class RecoverPersonalSignWithReferralCodeDto {
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
    })
    @IsDefined()
    referral_code: string

    @ApiProperty({
        required: true,
        description: 'signature from metamask',
    })
    @IsDefined()
    signature: string
}
