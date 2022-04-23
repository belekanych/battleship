import { Controller, Get, Post, Body, Param } from '@nestjs/common'
import { SessionService } from './session.service'

@Controller('/api/sessions')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Get('/all')
  findAll() {
    return this.sessionService.findAll()
  }

  @Get('/:id/join/qr-code')
  async getJoinQrCode(@Param('id') id: string): Promise<string> {
    return await this.sessionService.getJoinQrCode(+id)
  }
}
