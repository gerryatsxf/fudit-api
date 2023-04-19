import {Test, TestingModule} from '@nestjs/testing';
import {INestApplication, ValidationPipe} from '@nestjs/common';
import * as request from 'supertest';
import {AppModule} from './../src/app.module';

// describe('AppController (e2e)', () => {
//   let app: INestApplication;

//   beforeEach(async () => {
//     const moduleFixture: TestingModule = await Test.createTestingModule({
//       imports: [AppModule],
//     }).compile();

//     app = moduleFixture.createNestApplication();
//     await app.init();
//   });

//   it('/ (GET)', () => {
//     return request(app.getHttpServer())
//       .get('/')
//       .expect(200)
//       .expect('Hello World!');
//   });
// });

describe('Auth', () => {
  const email = `${Math.random()}@adamcowley.co.uk`;
  const password = 'sdfsdf';
  let token;
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    // Use Validation Pipe
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  afterEach(() => app.close());

  describe('POST /auth/register', () => {
    it('should validate request', () => {
      return request(app.getHttpServer())
        .post('/auth/register')
        .set('Accept', 'application/json')
        .send({
          email: 'a@b.com',
          dateOfBirth: '2019-01-01',
        })
        .expect(400)
        .expect(res => {
          // Check the body
          console.log(res.body);
          // Should have an error about the password
          expect(res.body.message).toContain('password should not be empty');
          // Should have an error about the date being later than 13 years ago
          // expect(
          //   res.body.message.find((m: string) => m.startsWith('maximal allowed date for dateOfBirth'))
          // ).toBeDefined()
        });
    });

    // it('should return a JWT token on successful registration', () => {
    //   const email = `fwfwefwefw@adamcowley.co.uk`
    //   return request(app.getHttpServer())
    //     .post('/auth/register')
    //     .set('Accept', 'application/json')
    //     .send({
    //       email,
    //       firstName: 'Adam',
    //       lastName: 'Cowley',
    //       password: "sdfsdf",
    //       dateOfBirth: '2000-01-01'
    //     })
    //     .expect(201)
    //     .expect(res => {
    //         expect(res.body.user.email).toEqual(email)
    //     })
    // })
  });

  describe('POST /auth/login', () => {
    it('should return 401 status on bad username', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .set('Accept', 'application/json')
        .send({
          email: 'unknown@example.com',
          password: 'incorrect',
        })
        .expect(401);
    });
    it('should return 401 status on bad password', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .set('Accept', 'application/json')
        .send({
          email,
          password: 'incorrect',
        })
        .expect(401);
    });
    it('should return a JWT token on successful login', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .set('Accept', 'application/json')
        .send({
          email,
          password,
        })
        .expect(201)
        .expect(res => {
          expect(res.body.access_token).toBeDefined();
          token = res.body.access_token;
        });
    });
  });

  describe('GET /auth/user', () => {
    it('should authenticate user with the JWT token', () => {
      return request(app.getHttpServer())
        .get('/auth/user')
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .expect(res => {
          expect(res.body.email).toEqual(email);
        });
    });
    it('should return error if no JWT supplied', () => {
      return request(app.getHttpServer()).get('/auth/user').expect(401);
    });
    it('should return error if incorrect JWT supplied', () => {
      return request(app.getHttpServer())
        .get('/auth/user')
        .set('Authorization', `Bearer ${token.replace(/[0-9]+/g, 'X')}`)
        .expect(401);
    });
  });
});
