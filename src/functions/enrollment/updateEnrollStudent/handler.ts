import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
import { formatJSONResponse } from "@libs/apiGateway";
import { updateData } from "@libs/dynamodb";
import { middyfy } from "@libs/lambda";

import schema from "./schema";

const updateEnrollStudent: ValidatedEventAPIGatewayProxyEvent<typeof schema> =
  async (event) => {
    const { courseid, studentid, dateofassigment } = event.body;
    const { id } = event.pathParameters;

    const data = {
      TableName: "OrganizationTable",
      Key: {
        id: id,
      },
      UpdateExpression:
        "set courseid=:courseid, studentid=:studentid , dateofassigment=:dateofassigment",

      ExpressionAttributeValues: {
        ":courseid": courseid,
        ":studentid": studentid,
        ":dateofassigment": dateofassigment,
      },
    };
    const res = await updateData(data);
    return formatJSONResponse({
      message: "enrollment updated",
    });
  };

export const main = middyfy(updateEnrollStudent);
