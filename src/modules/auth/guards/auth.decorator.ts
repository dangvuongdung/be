import { applyDecorators, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard'
import { ApiBearerAuth } from '@nestjs/swagger'

export function Auth() {
    return applyDecorators(ApiBearerAuth(), UseGuards(JwtAuthGuard))
}
