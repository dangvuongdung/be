import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import {
    recoverPersonalSignature,
    recoverTypedSignature,
    SignTypedDataVersion,
    TypedMessage,
} from '@metamask/eth-sig-util'
import { AppError } from '@configs/app-error'
import { ERROR_CODE } from '@configs/codes'
import { LoginResponseModel } from './domain/params/auth.models'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DateHelper } from '@helpers/date.helper'
import { User } from './domain/user.entity'
import { IUserModel } from './domain/user.model'
import Env from '@configs/environmentVariables'

@Injectable()
export class AuthService {
    constructor(@InjectRepository(User) private user: Repository<User>, private readonly jwtService: JwtService) {}

    async login(template: string, address: string, timestamp: number, signature: string): Promise<LoginResponseModel> {
        const now = DateHelper.now()
        if (now > timestamp + Env.Auth.LoginValidIn) throw new AppError(ERROR_CODE.BAD_REQUEST, 'Time expired')

        const recoverdAddress = await this.recoverPersonalSignature(template, address, timestamp, signature)
        if (recoverdAddress.toLowerCase() !== address.toLowerCase())
            throw new AppError(ERROR_CODE.BAD_REQUEST, 'Signature invalid')

        let user = await this.user.findOne({ where: { address } })

        if (!user) {
            const newUser = new User()
            newUser.address = address
            user = await this.user.save(newUser)
        }

        return this.getToken(address)
    }

    async refreshToken(address: string, refreshToken: string): Promise<LoginResponseModel> {
        try {
            const data: any = this.jwtService.verify(refreshToken)
            const user = await this.user.findOne({ address })
            if (user && data && data.address.toLowerCase() === address.toLowerCase()) {
                return this.getToken(address)
            } else {
                throw new AppError(ERROR_CODE.UNAUTHORIZED)
            }
        } catch (err) {
            throw new AppError(ERROR_CODE.UNAUTHORIZED)
        }
    }

    async recoverTypedSignatureV4(address: string, timestamp: number, signature: string): Promise<string> {
        const data: TypedMessage<any> = {
            domain: {
                name: 'AbcProtocol',
                version: '1',
                chainId: Env.ChainId,
            },
            message: {
                address: address,
                timestamp: timestamp,
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

        return recoverTypedSignature<SignTypedDataVersion.V4, any>({
            data,
            signature: signature,
            version: SignTypedDataVersion.V4,
        })
    }

    async recoverPersonalSignature(
        template: string,
        address: string,
        timestamp: number,
        signature: string
    ): Promise<string> {
        const data = template.replace('@address@', address).replace('@timestamp@', timestamp.toString())

        return recoverPersonalSignature({
            data: data,
            signature: signature,
        })
    }

    private getToken(address: string): LoginResponseModel {
        const payload = { address: address.toLowerCase() }

        return {
            access_token: this.jwtService.sign(payload, {
                expiresIn: Env.Auth.AccessTokenExpireIn,
            }),
            refresh_token: this.jwtService.sign(payload, {
                expiresIn: Env.Auth.RefreshTokenExpireIn,
            }),
        }
    }

    async getProfile(address: string): Promise<IUserModel> {
        return await this.user.findOne({ where: { address } })
    }
}
