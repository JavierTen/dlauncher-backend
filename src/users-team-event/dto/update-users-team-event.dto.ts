import { PartialType } from '@nestjs/mapped-types';
import { CreateUsersTeamEventDto } from './create-users-team-event.dto';

export class UpdateUsersTeamEventDto extends PartialType(CreateUsersTeamEventDto) {}
