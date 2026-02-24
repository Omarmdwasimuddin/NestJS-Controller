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
##### output path- localhost:3000/cats
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

##### output path- localhost:3000/cats/breed
![output](/public/img/breed.png)

### Controller: Request Object

Handlers অনেক সময় ক্লায়েন্টের request-এর বিস্তারিত তথ্য অ্যাক্সেস করার প্রয়োজন হয়। Nest ডিফল্টভাবে আন্ডারলাইনিং প্ল্যাটফর্ম (Express) থেকে request object-এ অ্যাক্সেস প্রদান করে।

তুমি handler-এর signature-এ `@Req()` decorator ব্যবহার করে Nest-কে request object inject করতে বললে, তখন সহজেই request object অ্যাক্সেস করতে পারবে।


```bash
# cats.controller.ts
import { Controller, Get, Req } from '@nestjs/common';
import type { Request } from 'express';

@Controller('cats')
export class CatsController {

    @Get()
    findAll(@Req() request: Request): string {
        return 'This action returns all cats';
    }

}
```
---

### Controller: Route wildcards

NestJS-এ pattern-based route-ও সমর্থিত। উদাহরণস্বরূপ, একটি route-এর শেষে যেকোনো ধরনের অক্ষরের সমন্বয় মিলানোর জন্য asterisk (*)-কে wildcard হিসেবে ব্যবহার করা যায়।

নিচের উদাহরণে, `findAll()` methodটি এমন যেকোনো route-এর জন্য execute হবে যা `abcd/` দিয়ে শুরু হয়—এর পর যত সংখ্যক অক্ষরই থাকুক না কেন।

```bash
# cats.controller.ts
import { Controller, Get, Req } from '@nestjs/common';
import type { Request } from 'express';

@Controller('cats')
export class CatsController {

    @Get('abcd/*')
    findAll(@Req() request: Request): string {
        return 'This route uses a wildcard';
    }

}
```
---

![](/public/img/wildcard.png)

```ts
@Get('abcd/*')
```

এর মানে হলো — এই method টি এমন সব GET request handle করবে যেগুলোর route `abcd/` দিয়ে শুরু হয় এবং এরপর যেকোনো কিছু থাকতে পারে।

### 🔎 ব্যাখ্যা

* `@Get()` → HTTP GET request handle করে
* `'abcd/*'` → এখানে `*` হলো wildcard
* `*` মানে → `abcd/` এর পরে যেকোনো character, যেকোনো দৈর্ঘ্যের হতে পারে

---

### 📌 উদাহরণ

এই decorator থাকলে নিচের সব route match করবে:

```
GET /abcd/123
GET /abcd/test
GET /abcd/hello-world
GET /abcd/anything-here
```

### Controller: Status code

যেমন বলা হয়েছে, response-এর default status code সবসময় 200 হয়, শুধুমাত্র POST request-এর জন্য default হয় 201।
তুমি চাইলে handler-এর level-এ @HttpCode(...) decorator ব্যবহার করে এই আচরণ সহজেই পরিবর্তন করতে পারো।


```bash
# cats.controller.ts
import { Controller, HttpCode, Post } from '@nestjs/common';

@Controller('cats')
export class CatsController {

    @Post()
    @HttpCode(204)
    create() {
        return 'This action adds a new cat'
    }

}
```
---

![](/public/img/statuscode.png)