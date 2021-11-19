import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
import { formatJSONResponse } from "@libs/apiGateway";
import { getAllData, getData } from "@libs/dynamodb";
import { middyfy } from "@libs/lambda";

import schema from "./schema";

const getAllCourse: ValidatedEventAPIGatewayProxyEvent<typeof schema> =
  async () => {
    const data = {
      TableName: "OrganizationTable",
      ProjectionExpression: "coursetitle , CH  ,coursecode ",
      FilterExpression: "begins_with(id,:d)",
      ExpressionAttributeValues: {
        ":d": "course",
      },
    };

    const res = await getAllData(data);

    return formatJSONResponse({
      message: "course found",
      course: res,
    });
  };

export const main = middyfy(getAllCourse);
