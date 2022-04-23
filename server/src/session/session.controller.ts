import { Controller, Get, Post, Body, Param } from '@nestjs/common'
import { SessionService } from './session.service'

@Controller('/api/sessions')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Post('/')
  create() {
    return this.sessionService.create()
  }

  @Get('/all')
  findAll() {
    return this.sessionService.findAll()
  }

  @Post('/:id/join')
  join(@Param('id') id: string) {
    return this.sessionService.join(+id)
  }

  @Get('/:id/join/qr-code')
  async getJoinQrCode(@Param('id') id: string): Promise<string> {
    return await this.sessionService.getJoinQrCode(+id)
  }
}
