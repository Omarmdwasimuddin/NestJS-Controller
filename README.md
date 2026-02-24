<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

### Controller

```bash
# create controller
$ nest g controller cats
```
---

```bash
# cats.controller.ts
import { Controller, Get } from '@nestjs/common';

@Controller('cats')
export class CatsController {

    @Get()
    findAll(): string {
        return 'This action returns all cats';
    }

}
```
---
##### path- localhost:3000/cats
![output](/public/img/cats.png)

```bash
# cats.controller.ts
import { Controller, Get } from '@nestjs/common';

@Controller('cats')
export class CatsController {

    @Get('breed')
    findAll(): string {
        return 'This action returns all cats';
    }

}
```
---

##### path- localhost:3000/cats/breed
![output](/public/img/breed.png)