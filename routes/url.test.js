import request from "supertest";
// const request = require("supertest");
import app from "express";
// const app = require("express");
import { mongoConnect, mongoDisconnect } from "../config/db";

describe("Launches API", () => {
  beforeAll(async () => {
    await mongoConnect();
  });

  afterAll(async () => {
    await mongoDisconnect();
  });

  //   describe('Test GET /launches', () => {
  //     test('It should respond with 200 success', async () => {
  //       const response = await request(app)
  //         .get('/v1/launches')
  //         .expect('Content-Type', /json/)
  //         .expect(200);
  //     });
  //   });

  describe("Test shorten url", () => {
    // const completeLaunchData = {
    //   mission: 'USS Enterprise',
    //   rocket: 'NCC 1701-D',
    //   target: 'Kepler-62 f',
    //   launchDate: 'January 4, 2028',
    // };

    // const launchDataWithoutDate = {
    //   mission: 'USS Enterprise',
    //   rocket: 'NCC 1701-D',
    //   target: 'Kepler-62 f',
    // };

    // const launchDataWithInvalidDate = {
    //   mission: "USS Enterprise",
    //   rocket: "NCC 1701-D",
    //   target: "Kepler-62 f",
    //   launchDate: "zoot",
    // };

    const testingData = {
      longUrl:
        "https://pixabay.com/photos/woman-dress-fashion-culture-9264738/",
    };

    test("It should respond with 200", async () => {
      const response = await request(app)
        .post("/api/shorten")
        .send(testingData)
        .expect("Content-Type", /json/)
        .expect(200);

      //   const requestDate = new Date(completeLaunchData.launchDate).valueOf();
      //   const responseDate = new Date(response.body.launchDate).valueOf();
      //   expect(responseDate).toBe(requestDate);

      //   expect(response.body).toMatchObject(launchDataWithoutDate);
    });

    test("It should catch missing required properties", async () => {
      const response = await request(app)
        .get("/")
        .expect("Content-Type", /json/)
        .expect(200);

      expect(response.body).toStrictEqual("Welcome to URL shortener API");
    });

    // test("It should catch invalid dates", async () => {
    //   const response = await request(app)
    //     .post("/v1/launches")
    //     .send(launchDataWithInvalidDate)
    //     .expect("Content-Type", /json/)
    //     .expect(400);

    //   expect(response.body).toStrictEqual({
    //     error: "Invalid launch date",
    //   });
    // });
  });
});
