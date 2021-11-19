import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
import { formatJSONResponse } from "@libs/apiGateway";
import { checkdataifExist, getData, updateData } from "@libs/dynamodb";
import { middyfy } from "@libs/lambda";

import schema from "./schema";

const updateStudent: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  const { name, email, age, dob } = event.body;
  const { id } = event.pathParameters;

  const data = {
    TableName: "OrganizationTable",
    Key: {
      id: id,
    },
    UpdateExpression: "set #name=:name, email=:email , age=:age, dob=:dob",
    ExpressionAttributeNames: {
      "#name": "name",
    },
    ExpressionAttributeValues: {
      ":name": name,
      ":email": email,
      ":age": age,
      ":dob": dob,
    },
  };

  const check = await checkdataifExist(email);
  if (check.Count > 0) {
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>" + check.Count);
    return formatJSONResponse({
      message: "This student  exits",
    });
  } else {
    const res = await updateData(data, id);
    return formatJSONResponse({
      res,
    });
  }
};

export const main = middyfy(updateStudent);
