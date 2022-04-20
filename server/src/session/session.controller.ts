import { Controller, Get, Post, Body, Param } from '@nestjs/common'
import { SessionService } from './session.service'

@Controller('/sessions')
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
}
