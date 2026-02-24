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

### Controller 01: Request Object

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

### Controller 02: Resources

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


### Controller 03: Route wildcards

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

### Controller 04: Status code

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

### Controller 05: Response headers

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

### Controller 06: Redirection

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

##### Hints: কখনো কখনো তুমি চাইতে পারো HTTP status code বা redirect URL dynamicভাবে নির্ধারণ করতে।এটি করার জন্য তুমি একটি object return করতে পারো, যা `HttpRedirectResponse` interface (from `@nestjs/common`) অনুযায়ী হবে।


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

### Controller 07: Route parameters



স্ট্যাটিক পাথ সহ রুটগুলো তখন কাজ করবে না যখন আপনাকে রিকোয়েস্টের অংশ হিসেবে ডায়নামিক ডেটা গ্রহণ করতে হবে (যেমন, GET /cats/1 যাতে id 1 এর ক্যাটটি পাওয়া যায়)। প্যারামিটার সহ রুট ডিফাইন করতে, আপনি রুট পাথে রুট প্যারামিটার টোকেন যোগ করতে পারেন যা URL থেকে ডায়নামিক ভ্যালুগুলো ক্যাপচার করবে। নিচের @Get() ডেকোরেটরের উদাহরণে এই পদ্ধতিটি দেখানো হয়েছে। এই রুট প্যারামিটারগুলো পরে @Param() ডেকোরেটর ব্যবহার করে অ্যাক্সেস করা যায়, যা মেথডের সিগনেচারে যোগ করতে হবে।

##### Hints: প্যারামিটারযুক্ত রুটগুলো অবশ্যই কোনো স্ট্যাটিক পাথের পরে ডিক্লেয়ার করা উচিত। এটি নিশ্চিত করে যে প্যারামিটারযুক্ত রুটগুলো স্ট্যাটিক পাথের জন্য নির্ধারিত ট্রাফিককে আটকাবে না।

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

##### Hints: Import Param from the @nestjs/common package.

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

### Controller 08: Sub-domain routing

```bash
# create controller
$ nest g controller admin
```
---

@Controller() ডেকোরেটর একটি `host` অপশন নিতে পারে, যা নিশ্চিত করে যে ইনকামিং HTTP রিকোয়েস্টের হোস্ট কোনো নির্দিষ্ট মানের সাথে মেলাতে হবে।

```bash
# admin.controller.ts
import { Controller, Get } from '@nestjs/common';

@Controller({ host:'admin.example.com' })
export class AdminController {
    @Get()
    index(): string {
        return 'Admin page'
    }
}
```
---

##### Hints: যেহেতু Fastify নেস্টেড রাউটার সমর্থন করে না, তাই যদি আপনি সাবডোমেইন রাউটিং ব্যবহার করেন, তাহলে ডিফল্ট Express অ্যাডাপ্টার ব্যবহার করার পরামর্শ দেওয়া হয়।


একটি রুট পাথের মতো, `host` অপশনও টোকেন ব্যবহার করে হোস্ট নেমের সেই পজিশন থেকে ডায়নামিক ভ্যালু ক্যাপচার করতে পারে। নিচের @Controller() ডেকোরেটরের উদাহরণে হোস্ট প্যারামিটার টোকেন ব্যবহার দেখানো হয়েছে। এভাবে ডিক্লেয়ার করা হোস্ট প্যারামিটারগুলো পরে @HostParam() ডেকোরেটর ব্যবহার করে অ্যাক্সেস করা যায়, যা মেথডের সিগনেচারে যোগ করতে হবে।

```bash
# admin.controller.ts

@Controller({ host: ':account.example.com' })
export class AccountController {
  @Get()
  getInfo(@HostParam('account') account: string) {
    return account;
  }
}
```
---

### Controller 09: State sharing

অন্যান্য প্রোগ্রামিং ভাষা থেকে আসা ডেভেলপারদের জন্য এটা কিছুটা অবাক করার মতো হতে পারে যে Nest-এ প্রায় সবকিছুই ইনকামিং রিকোয়েস্টগুলোর মধ্যে শেয়ার করা হয়। এর মধ্যে রয়েছে ডাটাবেস কানেকশন পুল, গ্লোবাল স্টেটসহ সিঙ্গেলটন সার্ভিস ইত্যাদি।

এটা বোঝা গুরুত্বপূর্ণ যে Node.js রিকোয়েস্ট/রেসপন্স ভিত্তিক মাল্টি-থ্রেডেড স্টেটলেস মডেল ব্যবহার করে না, যেখানে প্রতিটি রিকোয়েস্ট আলাদা থ্রেড দ্বারা হ্যান্ডেল করা হয়। ফলে Nest-এ সিঙ্গেলটন ইনস্ট্যান্স ব্যবহার করা আমাদের অ্যাপ্লিকেশনের জন্য সম্পূর্ণ নিরাপদ।

তবে কিছু নির্দিষ্ট ক্ষেত্রে রিকোয়েস্ট-ভিত্তিক লাইফটাইমসহ কন্ট্রোলার প্রয়োজন হতে পারে। যেমন: GraphQL অ্যাপ্লিকেশনে প্রতি-রিকোয়েস্ট ক্যাশিং, রিকোয়েস্ট ট্র্যাকিং, অথবা মাল্টি-টেন্যান্সি বাস্তবায়ন। ইনজেকশন স্কোপ কীভাবে নিয়ন্ত্রণ করতে হয় সে সম্পর্কে আরও জানা যেতে পারে সংশ্লিষ্ট ডকুমেন্টেশনে।

### Controller 10: Asynchronicity

আমরা আধুনিক JavaScript পছন্দ করি, বিশেষ করে এর অ্যাসিনক্রোনাস ডাটা হ্যান্ডলিংয়ের উপর জোর দেওয়াকে। এজন্যই Nest সম্পূর্ণভাবে async ফাংশন সমর্থন করে।

প্রতিটি async ফাংশন অবশ্যই একটি Promise রিটার্ন করবে, যা আপনাকে একটি বিলম্বিত (deferred) ভ্যালু রিটার্ন করার সুযোগ দেয় এবং Nest সেটিকে স্বয়ংক্রিয়ভাবে resolve করতে পারে। নিচে একটি উদাহরণ দেওয়া হলো:

```bash
# cats.controller.ts
import { Controller, Get} from '@nestjs/common';


@Controller('cats')
export class CatsController {

    @Get()
    async findAll(): Promise<any[]> {
        return [];
    }

}
```
---

এই কোডটি সম্পূর্ণভাবে বৈধ। তবে Nest এটিকে আরও এক ধাপ এগিয়ে নিয়ে যায়—এটি রুট হ্যান্ডলারকে RxJS এর Observable স্ট্রিম রিটার্ন করার সুযোগ দেয়। Nest অভ্যন্তরীণভাবে সাবস্ক্রিপশন পরিচালনা করে এবং স্ট্রিম সম্পন্ন হলে সর্বশেষ emitted হওয়া ভ্যালুটি resolve করে।


```bash
# cats.controller.ts

import { Controller, Get} from '@nestjs/common';
import { Observable, of } from 'rxjs';

@Controller('cats')
export class CatsController {

    @Get()
    findAll(): Observable<any[]> {
        return of([]);
    }

}

```
---

উভয় পদ্ধতিই বৈধ, এবং আপনার প্রয়োজন অনুযায়ী যেটি সবচেয়ে উপযুক্ত মনে হয় সেটি আপনি বেছে নিতে পারেন।


### Controller 11: Request payloads

আমাদের আগের উদাহরণে, POST রুট হ্যান্ডলার কোনো ক্লায়েন্ট প্যারামিটার গ্রহণ করছিল না। এখন আমরা সেটি ঠিক করবো @Body() ডেকোরেটর যোগ করে।

আগে এগোনোর আগে (যদি আপনি TypeScript ব্যবহার করেন), আমাদের DTO (Data Transfer Object) স্কিমা ডিফাইন করতে হবে। DTO হলো এমন একটি অবজেক্ট যা নির্ধারণ করে ডাটা কীভাবে নেটওয়ার্কের মাধ্যমে পাঠানো হবে। আমরা TypeScript ইন্টারফেস বা সাধারণ ক্লাস ব্যবহার করে DTO স্কিমা ডিফাইন করতে পারি। তবে এখানে ক্লাস ব্যবহার করার পরামর্শ দেওয়া হয়। কেন?

ক্লাস JavaScript ES6 স্ট্যান্ডার্ডের অংশ, তাই কম্পাইল হওয়ার পরেও এগুলো বাস্তব এন্টিটি হিসেবে JavaScript-এ থেকে যায়। অন্যদিকে, TypeScript ইন্টারফেস ট্রান্সপাইল করার সময় মুছে যায়, ফলে Nest রানটাইমে সেগুলো রেফার করতে পারে না। এটি গুরুত্বপূর্ণ, কারণ Pipes-এর মতো ফিচারগুলো রানটাইমে ভেরিয়েবলের metatype অ্যাক্সেসের উপর নির্ভর করে, যা কেবল ক্লাস ব্যবহার করলেই সম্ভব।

চলুন CreateCatDto ক্লাস তৈরি করি:

```bash
# create-cat.dto.ts
export class CreateCatDto {
    name: string;
    age: number;
    breed: string;
}
```
---

এটির মধ্যে মাত্র তিনটি বেসিক প্রপার্টি রয়েছে। এরপর আমরা এই নতুন তৈরি করা DTO-টি CatsController-এর ভিতরে ব্যবহার করতে পারি:

```bash
# create-cat.dto.ts
import { Body, Controller, Post} from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';


@Controller('cats')
export class CatsController {

    @Post()
    async create(@Body() createCatDto: CreateCatDto) {
        return 'This action adds a new cat';
        //return createCatDto;
    }

}
```
---

##### Hints: আমাদের ValidationPipe এমন প্রপার্টি ফিল্টার করতে পারে যেগুলো মেথড হ্যান্ডলার দ্বারা গ্রহণযোগ্য নয়। এই ক্ষেত্রে, আমরা গ্রহণযোগ্য প্রপার্টিগুলোকে হোয়াইটলিস্ট করতে পারি, এবং হোয়াইটলিস্টে না থাকা কোনো প্রপার্টি স্বয়ংক্রিয়ভাবে রিজাল্টিং অবজেক্ট থেকে সরিয়ে দেওয়া হয়। CreateCatDto উদাহরণে, আমাদের হোয়াইটলিস্ট হলো `name`, `age`, এবং `breed` প্রপার্টিগুলো। আরও জানতে এখানে [দেখুন](https://docs.nestjs.com/techniques/validation#stripping-properties)।

![](/public/img/requestPayload.png)


### Controller 12: Query parameters

আপনার রুটে কুয়েরি প্যারামিটার হ্যান্ডেল করার সময়, আপনি @Query() ডেকোরেটর ব্যবহার করে এগুলো ইনকামিং রিকোয়েস্ট থেকে বের করতে পারেন। আসুন দেখুন এটি বাস্তবে কীভাবে কাজ করে।

ধরি, আমাদের একটি রুট আছে যেখানে আমরা কুয়েরি প্যারামিটার যেমন `age` এবং `breed` ব্যবহার করে ক্যাটের তালিকা ফিল্টার করতে চাই। প্রথমে CatsController-এ কুয়েরি প্যারামিটারগুলো ডিফাইন করি:

```bash
# cats.controller.ts
import { Controller, Get, Query} from '@nestjs/common';


@Controller('cats')
export class CatsController {

    @Get()
    async findAll(@Query('age') age: number, @Query('breed') breed: string) {
        return `This action returns all cats filtered by age: ${age} and breed: ${breed}`;
    }

}
```
---

![](/public/img/query.png)

এই উদাহরণে, @Query() ডেকোরেটর ব্যবহার করে কুয়েরি স্ট্রিং থেকে `age` এবং `breed` এর মানগুলো বের করা হয়েছে। উদাহরণস্বরূপ, একটি রিকোয়েস্ট যা এইভাবে এসেছে:

GET /cats?age=2&breed=Persian

এর ফলে `age` হবে 2 এবং `breed` হবে Persian।


Nested query for array-
```bash
# cats.controller.ts
import { Controller, Get, Query} from '@nestjs/common';


@Controller('cats')
export class CatsController {

    @Get()
    async findAll(
        @Query('age') age: number, 
        @Query('breed') breed: string[] 
    ) {
        return `Cats filtered by age: ${age} and breed: ${breed}`;
    }

}
```
---

![](/public/img/query2.png)


Nested query for object-
```bash
# cats.controller.ts
import { Controller, Get, Query} from '@nestjs/common';


@Controller('cats')
export class CatsController {

    @Get()
    async findAll(@Query('filter') filter: string) {
        const parsed = JSON.parse(filter);
        return `Filtered cats: age=${parsed.age}, breed=${parsed.breed}, live=${parsed.live}`;
    }

}
```
---

![](/public/img/query3.png)