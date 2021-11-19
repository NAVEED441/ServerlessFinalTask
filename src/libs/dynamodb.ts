const AWS = require("aws-sdk");

const dynamodb = new AWS.DynamoDB.DocumentClient({
  region: "localhost",
  endpoint: "http://localhost:8000",
});
//post function for all
export const addData = async (params) => {
  const data1 = await dynamodb.put(params).promise();

  return data1;
};

// getfunction
export const getData = async (params) => {
  const data1 = await dynamodb.get(params).promise();
  if (data1.Item) {
    return data1;
  } else return "not found";
};

//update function
export const updateData = async (params, id) => {
  const data = {
    TableName: "OrganizationTable",
    Key: {
      id,
    },
  };

  // checking if the data is found or not
  const checking = await getData(data);

  if (checking.Item !== null) {
    const data1 = await dynamodb.update(params).promise();
    return "Student updated";
  } else {
    return "student Not exist";
  }
};
export const deleteData = async (params) => {
  // checking if the data is found or not
  const checking = await getData(params);

  if (checking.Item) {
    const data1 = await dynamodb.delete(params).promise();
    return "student Deleted";
  } else {
    return "student not exist";
  }
};

export const getAllData = async (params) => {
  const data1 = await dynamodb.scan(params).promise();
  console.log(data1);
  return data1;
};

export const checkdataifExist = async (params) => {
  try {
    const data = {
      TableName: "OrganizationTable",
      FilterExpression: "email=:email",

      ExpressionAttributeValues: {
        ":email": params.email,
      },
    };
    const result = await dynamodb.scan(data).promise();
    return result;
  } catch (err) {
    return err;
  }
};
