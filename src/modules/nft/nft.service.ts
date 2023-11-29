import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from '@modules/auth/domain/user.entity'
import { MintDto } from './domain/params/nft.dtos'
import { Nft } from './domain/nft.entity'
import { AppError } from '@configs/app-error'
import { ERROR_CODE } from '@configs/codes'
import { DateHelper } from '@helpers/date.helper'
import { Wallet, ethers } from 'ethers'
import * as abi from '@contracts/abi/NFt.json'

@Injectable()
export class NftService {
    private readonly provider: ethers.providers.JsonRpcProvider
    private readonly signer: Wallet
    private readonly contract: ethers.Contract

    constructor(@InjectRepository(Nft) private nft: Repository<Nft>) {
        this.provider = new ethers.providers.JsonRpcProvider(process.env.RPC_ENDPOINT)
        this.signer = new ethers.Wallet(process.env.OPERATOR_KEY, this.provider)
        this.contract = new ethers.Contract(process.env.CONTRACT, abi, this.signer)
    }

    async mint(params: MintDto, minter: string): Promise<any> {
        const { address, expire, token_id } = params

        if (minter !== process.env.OPERATOR_ADDRESS) {
            throw new AppError(ERROR_CODE.FORBIDDEN)
        }

        const fee = await this.provider.getFeeData()

        const override = { gasPrice: Math.round(3 * Number(fee.gasPrice)) }

        const tx = await this.contract.mint(address, token_id, expire, override)

        await tx.wait()

        const newNft = new Nft()
        newNft.address = address
        newNft.expire = expire
        newNft.token_id = token_id

        return await this.nft.save(newNft)
    }

    async getNft(address: string): Promise<any> {
        return await this.nft.findOne({ where: { address } })
    }

    async checkSubcribe(address: string, token_id: Number): Promise<any> {
        const nft = await this.nft.findOne({ where: { address, token_id } })
        const now = DateHelper.now()

        return { isExpire: nft ? (nft.expire < now ? true : false) : true }
    }
}
