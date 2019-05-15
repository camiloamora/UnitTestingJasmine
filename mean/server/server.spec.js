const express = require('express');
const logger = require('morgan');
const http = require('http');
const PinsRouter = require('./routes/pins');
const Pins = require('./models/Pins');
const request = require('request');
const app = express();

app.use(logger('dev'))
app.use(express.json())
app.use('/api', PinsRouter.router)
app.set('port', 3000)

describe('Testing Router', () => {
  let server;

  beforeAll(() => {
    server = http.createServer(app);
    server.listen(3000)
  });

  afterAll(() => {
    server.close();
  });

  describe('GET', () => {
    //GET 200
    it('200 and find pin', done => {
      const data = [{id: 1}];
      spyOn(Pins, 'find').and.callFake(callBack => {
        callBack(false, data);
      });

      request.get('http://localhost:3000/api', (error, response, body) => {
        expect(response.statusCode).toBe(200);
        expect(JSON.parse(response.body)).toEqual([{id: 1}]);
        done();
      })
    })

    // GET 500
    it('500', done => {
      const data = [{id: 1}];
      spyOn(Pins, 'find').and.callFake(callBack => {
        callBack(true, data);
      });

      request.get('http://localhost:3000/api', (error, response, body) => {
        expect(response.statusCode).toBe(500);
        done();
      })
    })

    it('200 and GetbyId', done => {
      const data = {id:1};
      spyOn(Pins, 'findById').and.callFake((id, callBack) => {
        data.param = id;
        callBack(false, data);
      })
      request.get('http://localhost:3000/api/1522', (error, response, body) => {
        expect(response.statusCode).toBe(200);
        expect(JSON.parse(response.body)).toEqual({id: 1, param: "1522"});
        expect(JSON.parse(response.body).id).toEqual(1);
        done();
      })
    })

    it('200 and GetbyId', done => {
      const data = {id:1};
      spyOn(Pins, 'findById').and.callFake((id, callBack) => {
        data.param = id;
        callBack(true, data);
      })
      request.get('http://localhost:3000/api/1522', (error, response, body) => {
        expect(response.statusCode).toBe(500);
        done();
      })
    })

  })
})
