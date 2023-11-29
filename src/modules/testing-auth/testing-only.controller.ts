import { Controller, Post, Body } from '@nestjs/common'
import { SignTypedDataVersion, TypedMessage, signTypedData, personalSign } from '@metamask/eth-sig-util'
import { ApiTags } from '@nestjs/swagger'
import { SignTypedDataV4Dto, PersonalSignDto } from './testing-only.dtos'
import Env from '@configs/environmentVariables'

@ApiTags('testing-only')
@Controller('testing-only')
export class TestingOnlyController {
    @Post('signTypedDataV4')
    async signTypedDataV4(@Body() body: SignTypedDataV4Dto) {
        const data: TypedMessage<any> = {
            domain: {
                name: 'AbcProtocol',
                version: '1',
                chainId: Env.ChainId,
            },
            message: {
                address: body.address,
                timestamp: body.timestamp,
            },
            types: {
                EIP712Domain: [
                    { name: 'name', type: 'string' },
                    { name: 'version', type: 'string' },
                    { name: 'chainId', type: 'uint256' },
                ],
                Body: [
                    { name: 'address', type: 'address' },
                    { name: 'timestamp', type: 'uint256' },
                ],
            },
            primaryType: 'Body',
        }

        const privateKey = new Buffer(body.privateKey, 'hex')

        return signTypedData<SignTypedDataVersion.V4, any>({
            privateKey,
            data,
            version: SignTypedDataVersion.V4,
        })
    }

    @Post('personalSign')
    async personalSign(@Body() body: PersonalSignDto) {
        const data = body.template.replace('@address@', body.address).replace('@timestamp@', body.timestamp.toString())
        const privateKey = new Buffer(body.privateKey, 'hex')
        return personalSign({
            privateKey,
            data,
        })
    }
}
