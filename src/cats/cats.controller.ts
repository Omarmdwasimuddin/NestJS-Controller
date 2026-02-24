import { Controller, Get, Param} from '@nestjs/common';

@Controller('cats')
export class CatsController {

    @Get(':id')
    findOne(@Param('id') id: string): string {
        return `This action returns a #${id} cat`;
    }

}