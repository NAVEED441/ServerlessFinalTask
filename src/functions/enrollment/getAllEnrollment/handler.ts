import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
import { formatJSONResponse } from "@libs/apiGateway";
import { getAllData } from "@libs/dynamodb";
import { middyfy } from "@libs/lambda";

import schema from "./schema";

const getAllEnrollment: ValidatedEventAPIGatewayProxyEvent<typeof schema> =
  async () => {
    const data = {
      TableName: "OrganizationTable",
      ProjectionExpression: "studentid,courseid,dateofassigment",
      FilterExpression: "begins_with(id,:d)",
      ExpressionAttributeValues: {
        ":d": "enrollment",
      },
    };

    const res = await getAllData(data);

    return formatJSONResponse({
      message: "enrollment found",
      course: res,
    });
  };

export const main = middyfy(getAllEnrollment);
