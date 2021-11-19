import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
import { formatJSONResponse } from "@libs/apiGateway";
import { getData } from "@libs/dynamodb";
import { middyfy } from "@libs/lambda";

import schema from "./schema";

const getCourse: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  const { id } = event.pathParameters;

  const param = {
    id,
  };
  const data = {
    TableName: "OrganizationTable",
    Key: {
      id: param.id,
    },
    ProjectionExpression: "coursetitle, CH , id",
  };
  const res = await getData(data);

  return formatJSONResponse({
    res,
  });
};

export const main = middyfy(getCourse);
