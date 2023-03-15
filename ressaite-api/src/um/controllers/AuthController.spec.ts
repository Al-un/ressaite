import { assert } from "chai";
import request from "supertest";

import app from "@/app";

describe("Dummy test", () => {
  it("does nothing interesting", async () => {
    assert.equal(1, 1);
    let res;
    // res = await request(app)
    //   .post("/login")
    //   .send({ username: "pouet", password: "pouet" })
    //   .set("Accept", "application/json");
    // console.log(res.body);

    res = await request(app)
      .post("/login")
      .send({ username: "admin", password: "plop" })
      .set("Accept", "application/json");
    console.log(res.body);
  });
});
