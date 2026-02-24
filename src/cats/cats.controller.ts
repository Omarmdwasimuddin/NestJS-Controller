import { Controller, Get, Query} from '@nestjs/common';


@Controller('cats')
export class CatsController {

    @Get()
    async findAll(@Query('filter') filter: string) {
        const parsed = JSON.parse(filter);
        return `Filtered cats: age=${parsed.age}, breed=${parsed.breed}, live=${parsed.live}`;
    }

}