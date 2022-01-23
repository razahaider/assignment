let chai = require("chai");
let server = require("../index");
let chaiHttp = require("chai-http");

chai.should();

chai.use(chaiHttp);

describe('users API', () => {

    before('testing all users API', function(done) {
        //insert data
        const saveUser = { name: "Duser1", address: "USA", designation: "Software Engineer", age: 19 };
        // { name: "Duser2", address: "Georgia", designation: "Doctor", age: 20 },
        // { name: "Duser3", address: "Vancouver", designation: "Scentist", age: 21 },
        // { name: "Duser4", address: "Columbo", designation: "Plumber", age: 22 },
        // { name: "Duser5", address: "Atlanta", designation: "Driver", age: 23 }

        chai.request(server)
            .post("/saveUsers")
            .send(saveUser)
            .end((err, response) => {
                response.should.have.status(200);
                done();
            })
    });
    before('testing all users API', function(done) {
        //insert data
        const saveUser = { name: "Duser3", address: "Vancouver", designation: "Scentist", age: 21 };
        // { name: "Duser4", address: "Columbo", designation: "Plumber", age: 22 },
        // { name: "Duser5", address: "Atlanta", designation: "Driver", age: 23 }

        chai.request(server)
            .post("/saveUsers")
            .send(saveUser)
            .end((err, response) => {
                response.should.have.status(200);
                done();
            })
    });
    before('testing all users API', function(done) {
        //insert data
        const saveUser = { name: "Duser2", address: "Georgia", designation: "Doctor", age: 20 };
        // { name: "Duser3", address: "Vancouver", designation: "Scentist", age: 21 },
        // { name: "Duser4", address: "Columbo", designation: "Plumber", age: 22 },
        // { name: "Duser5", address: "Atlanta", designation: "Driver", age: 23 }

        chai.request(server)
            .post("/saveUsers")
            .send(saveUser)
            .end((err, response) => {
                response.should.have.status(200);
                done();
            })
    });
    /*
    Test the PUT

    */
    describe("PUT /UsersList/:id", () => {
        it("update a user", (done) => {
            const id = 5;
            const updateUser = { name: "dummyuser123", address: "Georgia", designation: "Software Engineer", age: 22 };
            chai.request(server)
                .put("/UsersList/" + id)
                .send(updateUser)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('string');
                    response.body.should.include("user with id");
                    done();
                })

        })
    });

    /*
    TEST the POST
    */
    describe("POST /saveUsers", () => {
        it("Save a user", (done) => {

            const saveUser = { name: "dummyuser123", address: "Georgia", designation: "Software Engineer", age: 22 };
            chai.request(server)
                .post("/saveUsers")
                .send(saveUser)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('name').eq("dummyuser123");
                    done();
                })

        })
    });

    /*
    TEST the DELETE
    */
    describe("DELETE /UsersList/:id", () => {
        it("Delete a user", (done) => {
            //please insert this user first then run this unit test
            const id = 0;
            // const saveUser = { name: "dummyuser123", address: "Georgia", designation: "Software Engineer", age: 22 };

            // chai.request(server)
            //     .post("/saveUsers")
            //     .send(saveUser)
            //     .end((err, response) => {
            //         response.should.have.status(200);
            //         id = response.body.property('id').value();
            //     });
            //dummy commit

            chai.request(server)
                .delete("/UsersList/" + id)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('string');
                    response.body.should.be.eq(`user with id ${id} - deleted`);
                    done();
                })

        })



    });

    /*

    Test the GET All Users
    */

    describe("GET /UsersList", () => {
        it("Get all users", (done) => {
            chai.request(server)
                .get("/UsersList")
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                    // response.body.should.have.length(2);
                    done();
                })

        })



    });

    describe("GET /UsersList/:name", () => {
        it("Get single user by name", (done) => {
            const name = "Duser1";
            chai.request(server)
                .get("/UsersList/" + name)
                .end((err, response) => {
                    response.should.have.status(200);
                    console.log(response.body);
                    response.body.should.be.a('object');
                    response.body.should.have.property('name').eq(name);
                    done();
                })

        });



    })

    /*
    Test the string is palindrome or not
   */
    describe("POST /checkPalindrome", () => {
        it("check if palindrome or not", (done) => {
            const reqbody = {
                str: "radar"
            };
            chai.request(server)
                .post("/checkPalindrome")
                .send(reqbody)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('string');
                    response.body.should.be.eq("its a palindrome");
                    done();
                })

        })

    });

    /*
    negative test for palindrome:
*/
    describe("POST /checkPalindrome", () => {
        it("check if palindrome IS NOT", (done) => {
            const reqbody = {
                str: "radaar"
            };
            chai.request(server)
                .post("/checkPalindrome")
                .send(reqbody)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('string');
                    response.body.should.be.eq("its NOT a palindrome");
                    done();
                })

        })

    });


});