import { Controller, HttpCode, Post } from '@nestjs/common';

@Controller('cats')
export class CatsController {

    @Post()
    @HttpCode(204)
    create() {
        return 'This action adds a new cat'
    }

}
