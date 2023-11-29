import { Module } from '@nestjs/common'
import { NftService } from './nft.service'
import { NftController } from './nft.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Nft } from './domain/nft.entity'

@Module({
    imports: [TypeOrmModule.forFeature([Nft])],
    controllers: [NftController],
    providers: [NftService],
    exports: [],
})
export class NftModule {}
