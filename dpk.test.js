const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("returns the partitionKey if it exists", () => {
    const event = { partitionKey: "123" };
    expect(deterministicPartitionKey(event)).toEqual("123");
  });

  it("returns a hashed value if the partitionKey does not exist", () => {
    const event = { someData: "data" };
    const result = deterministicPartitionKey(event);
    expect(typeof result).toEqual("string");
    expect(result.length).toBeLessThanOrEqual(256);
  });

  it("returns a hashed value if the partitionKey is longer than 256 characters", () => {
    const longPartitionKey = "a".repeat(300);
    const event = { partitionKey: longPartitionKey };
    const result = deterministicPartitionKey(event);
    expect(typeof result).toEqual("string");
    expect(result.length).toBeLessThanOrEqual(256);
  });

  it("returns '0' if the event is falsy", () => {
    expect(deterministicPartitionKey(null)).toEqual("0");
  });
});

/*
This code tests the different scenarios in which the deterministicPartitionKey function might be used, including the case where the event has a partition key, the case where the event does not have a partition key, and the case where the event is falsy. The tests verify that the expected values are returned and that the returned values have the correct data type and length.
*/