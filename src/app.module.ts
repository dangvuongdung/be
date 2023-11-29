import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './modules/auth/auth.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppDataSource } from '@configs/data-source'
import { TestingOnlyModule } from '@modules/testing-auth/testing-only.module'
import { NftModule } from '@modules/nft/nft.module'

@Module({
    imports: [TypeOrmModule.forRoot(AppDataSource), AuthModule, TestingOnlyModule, NftModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
