let mongoose = require("mongoose");
let server = require("./app");
let chai = require("chai");
let chaiHttp = require("chai-http");

// Mock Mongoose model findOne to return static planet data for testing
const planetModel = mongoose.model('planets');
planetModel.findOne = function(query) {
    const planets = {
        1: { id: 1, name: 'Mercury', description: 'Mercury is...', image: 'mercury.png' },
        2: { id: 2, name: 'Venus', description: 'Venus is...', image: 'venus.png' },
        3: { id: 3, name: 'Earth', description: 'Earth is...', image: 'earth.png' },
        4: { id: 4, name: 'Mars', description: 'Mars is...', image: 'mars.png' },
        5: { id: 5, name: 'Jupiter', description: 'Jupiter is...', image: 'jupiter.png' },
        6: { id: 6, name: 'Saturn', description: 'Saturn is...', image: 'saturn.png' },
        7: { id: 7, name: 'Uranus', description: 'Uranus is...', image: 'uranus.png' },
        8: { id: 8, name: 'Neptune', description: 'Neptune is...', image: 'neptune.png' }
    };
    const id = query && query.id;
    if (id === 9) {
        return {
            exec: async () => { throw new Error("Mock database error"); }
        };
    }
    const planet = planets[id];
    return {
        exec: async () => planet || null
    };
};

// Assertion 
chai.should();
chai.use(chaiHttp); 

describe('Planets API Suite', () => {

    describe('Fetching Planet Details', () => {
        it('it should fetch a planet named Mercury', (done) => {
            let payload = {
                id: 1
            }
          chai.request(server)
              .post('/planet')
              .send(payload)
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('id').eql(1);
                    res.body.should.have.property('name').eql('Mercury');
                done();
              });
        });

        it('it should fetch a planet named Venus', (done) => {
            let payload = {
                id: 2
            }
          chai.request(server)
              .post('/planet')
              .send(payload)
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('id').eql(2);
                    res.body.should.have.property('name').eql('Venus');
                done();
              });
        });

        it('it should fetch a planet named Earth', (done) => {
            let payload = {
                id: 3
            }
          chai.request(server)
              .post('/planet')
              .send(payload)
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('id').eql(3);
                    res.body.should.have.property('name').eql('Earth');
                done();
              });
        });
        it('it should fetch a planet named Mars', (done) => {
            let payload = {
                id: 4
            }
          chai.request(server)
              .post('/planet')
              .send(payload)
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('id').eql(4);
                    res.body.should.have.property('name').eql('Mars');
                done();
              });
        });

        it('it should fetch a planet named Jupiter', (done) => {
            let payload = {
                id: 5
            }
          chai.request(server)
              .post('/planet')
              .send(payload)
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('id').eql(5);
                    res.body.should.have.property('name').eql('Jupiter');
                done();
              });
        });

        it('it should fetch a planet named Satrun', (done) => {
            let payload = {
                id: 6
            }
          chai.request(server)
              .post('/planet')
              .send(payload)
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('id').eql(6);
                    res.body.should.have.property('name').eql('Saturn');
                done();
              });
        });

        it('it should fetch a planet named Uranus', (done) => {
            let payload = {
                id: 7
            }
          chai.request(server)
              .post('/planet')
              .send(payload)
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('id').eql(7);
                    res.body.should.have.property('name').eql('Uranus');
                done();
              });
        });

        it('it should fetch a planet named Neptune', (done) => {
            let payload = {
                id: 8
            }
          chai.request(server)
              .post('/planet')
              .send(payload)
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('id').eql(8);
                    res.body.should.have.property('name').eql('Neptune');
                done();
              });
        });

        // it('it should fetch a planet named Pluto', (done) => {
        //     let payload = {
        //         id: 9
        //     }
        //   chai.request(server)
        //       .post('/planet')
        //       .send(payload)
        //       .end((err, res) => {
        //             res.should.have.status(200);
        //             res.body.should.have.property('id').eql(9);
        //             res.body.should.have.property('name').eql('Sun');
        //         done();
        //       });
        // });


    });        
});

//Use below test case to achieve coverage
describe('Testing Other Endpoints', () => {

    describe('it should fetch OS Details', () => {
        it('it should fetch OS details', (done) => {
          chai.request(server)
              .get('/os')
              .end((err, res) => {
                    res.should.have.status(200);
                done();
              });
        });
    });

    describe('it should fetch Live Status', () => {
        it('it checks Liveness endpoint', (done) => {
          chai.request(server)
              .get('/live')
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('status').eql('live');
                done();
              });
        });
    });

    describe('it should fetch Ready Status', () => {
        it('it checks Readiness endpoint', (done) => {
          chai.request(server)
              .get('/ready')
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('status').eql('ready');
                done();
              });
        });
    });

    describe('it should fetch Home Page', () => {
        it('it checks Home Page endpoint', (done) => {
          chai.request(server)
              .get('/')
              .end((err, res) => {
                    res.should.have.status(200);
                done();
              });
        });
    });

    describe('Validation and Error Paths', () => {
        it('it should return 400 for missing ID', (done) => {
            chai.request(server)
                .post('/planet')
                .send({})
                .end((err, res) => {
                    res.should.have.status(400);
                    res.text.should.eql('Planet ID is required');
                    done();
                });
        });

        it('it should return 400 for invalid ID range', (done) => {
            chai.request(server)
                .post('/planet')
                .send({ id: 99 })
                .end((err, res) => {
                    res.should.have.status(400);
                    res.text.should.eql('Invalid Planet ID. Select a number from 0 - 9');
                    done();
                });
        });

        it('it should return 400 for non-integer ID', (done) => {
            chai.request(server)
                .post('/planet')
                .send({ id: "invalid-id" })
                .end((err, res) => {
                    res.should.have.status(400);
                    res.text.should.eql('Invalid Planet ID. Select a number from 0 - 9');
                    done();
                });
        });

        it('it should return 500 when database error occurs', (done) => {
            chai.request(server)
                .post('/planet')
                .send({ id: 9 })
                .end((err, res) => {
                    res.should.have.status(500);
                    res.text.should.eql('Error in Planet Data');
                    done();
                });
        });
    });

});