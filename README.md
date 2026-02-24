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

### Controller: Resources

আগে আমরা cats resource fetch করার জন্য একটি endpoint (GET route) তৈরি করেছি।
এখন সাধারণত আমরা চাইব এমন একটি endpoint ও থাকবে যা নতুন record তৈরি করবে।
এই জন্য আমরা একটি POST handler তৈরি করব।


```bash
# cats.controller.ts
import { All, Controller, Get, Post} from '@nestjs/common';

@Controller('cats')
export class CatsController {

    @Post()
    create(): string {
        return 'This action adds a new cat';
    }

    @Get()
    findAll(): string {
        return 'This action returns all cats';
    }

    @All()
    user(): string {
        return 'This action returns all user'
    }

}
```
---

এটা খুবই সহজ। NestJS সব standard HTTP method-এর জন্য decorators দেয়:

* `@Get()`
* `@Post()`
* `@Put()`
* `@Delete()`
* `@Patch()`
* `@Options()`
* `@Head()`

এর পাশাপাশি, `@All()` ব্যবহার করলে এমন একটি endpoint তৈরি হয় যা সব ধরনের HTTP request handle করতে পারে।


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

#### 🔎 ব্যাখ্যা

* `@Get()` → HTTP GET request handle করে
* `'abcd/*'` → এখানে `*` হলো wildcard
* `*` মানে → `abcd/` এর পরে যেকোনো character, যেকোনো দৈর্ঘ্যের হতে পারে

---

#### 📌 উদাহরণ

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

### Controller: Response headers

কোনো custom response header সেট করতে, তুমি দুইভাবে করতে পারো:

1. @Header() decorator ব্যবহার করে
2. বা library-specific response object ব্যবহার করে (যেমন `res.header()` সরাসরি কল করে)

```bash
# cats.controller.ts
import { Controller, Header, Post} from '@nestjs/common';

@Controller('cats')
export class CatsController {

    @Post()
    @Header('Cache-Control', 'no-store')
    @Header('X-Powered-By', 'NestJS')
    create(): string {
        return 'This action adds a new cat';
    }

}
```
---

![](/public/img/responseheader.png)

### Controller: Redirection

Response কে কোনো নির্দিষ্ট URL-এ redirect করতে, তুমি দুইভাবে করতে পারো:

1. @Redirect() decorator ব্যবহার করে
2. বা library-specific response object ব্যবহার করে (যেমন `res.redirect()` সরাসরি কল করে)

---

#### @Redirect() ব্যাখ্যা

- `@Redirect()` দুইটা argument নিতে পারে:

  1. url → যেই URL-এ redirect করতে চাও
  2. statusCode → HTTP status code (optional)

- যদি statusCode না দেওয়া হয়, তাহলে default হবে 302 (Found)।


```bash
# cats.controller.ts
import { Controller, Get, Redirect} from '@nestjs/common';

@Controller('cats')
export class CatsController {

    @Get()
    @Redirect('https://wasim-uddin-portfolio.vercel.app/', 301)
    findAll(): string {
        return 'This action returns all cats';
    }

}
```
---

##### Note: কখনো কখনো তুমি চাইতে পারো **HTTP status code বা redirect URL** dynamicভাবে নির্ধারণ করতে।এটি করার জন্য তুমি একটি object return করতে পারো, যা `HttpRedirectResponse` interface (from `@nestjs/common`) অনুযায়ী হবে।


Return করা মানগুলো `@Redirect()` decorator-এ দেওয়া কোনো argument-এর উপর override করবে।

উদাহরণস্বরূপ:

```bash
# cats.controller.ts
import { Controller, Get, Query, Redirect} from '@nestjs/common';

@Controller('cats')
export class CatsController {

    @Get('docs')
    @Redirect('https://docs.nestjs.com', 301)
    getDocs(@Query('version') version) {
        if(version && version === '5') {
            return { url: 'https://docs.nestjs.com/v5/' };
        }
    }

}
```
---


🔹 @Query('version') version

HTTP GET request থেকে version নামের query parameter নিতে ব্যবহার করা হয়।

উদাহরণ: /cats/docs?version=5 → version এর মান হবে '5'

### Controller: Route parameters



স্ট্যাটিক পাথ সহ রুটগুলো তখন কাজ করবে না যখন আপনাকে রিকোয়েস্টের অংশ হিসেবে ডায়নামিক ডেটা গ্রহণ করতে হবে (যেমন, GET /cats/1 যাতে id 1 এর ক্যাটটি পাওয়া যায়)। প্যারামিটার সহ রুট ডিফাইন করতে, আপনি রুট পাথে রুট প্যারামিটার টোকেন যোগ করতে পারেন যা URL থেকে ডায়নামিক ভ্যালুগুলো ক্যাপচার করবে। নিচের @Get() ডেকোরেটরের উদাহরণে এই পদ্ধতিটি দেখানো হয়েছে। এই রুট প্যারামিটারগুলো পরে @Param() ডেকোরেটর ব্যবহার করে অ্যাক্সেস করা যায়, যা মেথডের সিগনেচারে যোগ করতে হবে।

##### Note: প্যারামিটারযুক্ত রুটগুলো অবশ্যই কোনো স্ট্যাটিক পাথের পরে ডিক্লেয়ার করা উচিত। এটি নিশ্চিত করে যে প্যারামিটারযুক্ত রুটগুলো স্ট্যাটিক পাথের জন্য নির্ধারিত ট্রাফিককে আটকাবে না।

```bash
# cats.controller.ts
import { Controller, Get, Param} from '@nestjs/common';

@Controller('cats')
export class CatsController {

    @Get(':id')
    findOne(@Param() params: any): string {
        console.log(params.id);
        return `This action returns a #${params.id} cat`;
    }

}
```
---

![](/public/img/param.png)

@Param() ডেকোরেটরটি একটি মেথড প্যারামিটার (উপরের উদাহরণে, params) কে ডেকোরেট করতে ব্যবহৃত হয়, যাতে রুট প্যারামিটারগুলো সেই ডেকোরেটেড মেথড প্যারামিটারের প্রপার্টি হিসেবে মেথডের ভিতরে অ্যাক্সেস করা যায়। কোডে দেখানো মতো, আপনি params.id রেফারেন্স করে id প্যারামিটারটি অ্যাক্সেস করতে পারেন। বিকল্পভাবে, আপনি ডেকোরেটরের কাছে নির্দিষ্ট প্যারামিটার টোকেন পাঠাতে পারেন এবং মেথডের বডির ভিতরে সরাসরি সেই রুট প্যারামিটারটি নাম ব্যবহার করে রেফারেন্স করতে পারেন।

##### Note: Import Param from the @nestjs/common package.

```bash
# cats.controller.ts
import { Controller, Get, Param} from '@nestjs/common';

@Controller('cats')
export class CatsController {

    @Get(':id')
    findOne(@Param('id') id: string): string {
        return `This action returns a #${id} cat`;
    }

}
```
---

![](/public/img/param.png)

### Controller: Sub-domain routing
