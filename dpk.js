const crypto = require("crypto");

exports.generatePartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;
  let partitionKey = TRIVIAL_PARTITION_KEY;

  if (event && event.partitionKey) {
    partitionKey = event.partitionKey;
  } else if (event) {
    const data = JSON.stringify(event);
    partitionKey = crypto
      .createHash("sha3-512")
      .update(data)
      .digest("hex");
  }

  if (typeof partitionKey !== "string") {
    partitionKey = JSON.stringify(partitionKey);
  }

  if (partitionKey.length > MAX_PARTITION_KEY_LENGTH) {
    partitionKey = crypto
      .createHash("sha3-512")
      .update(partitionKey)
      .digest("hex");
  }

  return partitionKey;
};

/* 
In this refactored version, the trivial partition key is assigned at the beginning and only overwritten if the event or the event's partition key are present. The hash calculation for the event data has been moved inside the else if statement, so it will only be executed if the event is present but doesn't contain a partition key. Additionally, the code has been rearranged to reduce the number of nested if statements.
*/