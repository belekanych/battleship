import { Module } from '@nestjs/common';
import { SessionService } from './session.service';
import { SessionController } from './session.controller';
import { SessionGateway } from './session.gateway';

@Module({
  controllers: [SessionController],
  providers: [SessionService, SessionGateway],
})
export class SessionModule {}
