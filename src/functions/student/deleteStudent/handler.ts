import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
import { formatJSONResponse } from "@libs/apiGateway";
import { deleteData } from "@libs/dynamodb";
import { middyfy } from "@libs/lambda";

import schema from "./schema";

const deleteStudent: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
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
  };
  const res = await deleteData(data);
  return formatJSONResponse({
    res,
  });
};

export const main = middyfy(deleteStudent);
