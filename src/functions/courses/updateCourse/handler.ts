import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
import { formatJSONResponse } from "@libs/apiGateway";
import { getData, updateData } from "@libs/dynamodb";
import { middyfy } from "@libs/lambda";

import schema from "./schema";

const updateCourse: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  const { id } = event.pathParameters;
  const { coursecode, coursetitle, CH } = event.body;

  const data = {
    TableName: "OrganizationTable",
    Key: {
      id: id,
    },
    UpdateExpression:
      "set coursecode=:coursecode, coursetitle=:coursetitle , CH=:CH",

    ExpressionAttributeValues: {
      ":coursecode": coursecode,
      ":coursetitle": coursetitle,
      ":CH": CH,
    },
  };
  const res = await updateData(data);

  return formatJSONResponse({
    message: "course updated",
  });
};

export const main = middyfy(updateCourse);
