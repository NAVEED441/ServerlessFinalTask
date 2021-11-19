import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
import { formatJSONResponse } from "@libs/apiGateway";
import { getAllData, getData } from "@libs/dynamodb";
import { middyfy } from "@libs/lambda";

import schema from "./schema";

const getAllStudent: ValidatedEventAPIGatewayProxyEvent<typeof schema> =
  async () => {
    const data = {
      TableName: "OrganizationTable",
      ProjectionExpression: "#name , email,age,dob ",
      ExpressionAttributeNames: {
        "#name": "name",
      },
      FilterExpression: "begins_with(id,:d)",
      ExpressionAttributeValues: {
        ":d": "student",
      },
    };

    const res = await getAllData(data);

    return formatJSONResponse({
      message: "student found",
      course: res,
    });
  };

export const main = middyfy(getAllStudent);
