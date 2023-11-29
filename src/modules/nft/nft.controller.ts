import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common'
import { NftService } from './nft.service'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard'
import { MintDto, ParamId } from './domain/params/nft.dtos'

@ApiTags('nft')
@Controller('nft')
export class NftController {
    constructor(private readonly service: NftService) {}

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Post('mint')
    getProfile(@Request() req, @Body() body: MintDto) {
        return this.service.mint(body, req.user.address)
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get('')
    getNft(@Request() req) {
        return this.service.getNft(req.user.address)
    }

    @Get(':id')
    checkExpire(@Request() req, @Param() param: ParamId) {
        return this.service.checkSubcribe(req.user.address, param.id)
    }
}
