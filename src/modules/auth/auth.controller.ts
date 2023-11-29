import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import { JwtAuthGuard } from './guards/jwt-auth.guard'
import { LoginDto, RefreshTokenDto } from './domain/params/auth.dtos'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { LoginResponseModel } from './domain/params/auth.models'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    async login(@Body() body: LoginDto): Promise<LoginResponseModel> {
        return this.authService.login(body.template, body.address, body.timestamp, body.signature)
    }

    @ApiBearerAuth()
    @Post('refresh-token')
    refreshToken(@Body() body: RefreshTokenDto): Promise<LoginResponseModel> {
        return this.authService.refreshToken(body.address, body.refreshToken)
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return this.authService.getProfile(req.user.address)
    }
}
