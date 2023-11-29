import { Module } from '@nestjs/common'
import { TestingOnlyController } from './testing-only.controller'
import { AuthModule } from '../auth/auth.module'

@Module({
    imports: [AuthModule],
    controllers: [TestingOnlyController],
    providers: [],
    exports: [],
})
export class TestingOnlyModule {}
