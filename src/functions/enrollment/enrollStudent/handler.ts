import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
import { formatJSONResponse } from "@libs/apiGateway";
import { addData } from "@libs/dynamodb";
import { middyfy } from "@libs/lambda";

import { v4 } from "uuid";
import schema from "./schema";

const enrollStudent: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  try {
    const { courseid, studentid, dateofassigment } = event.body;
    const id = "enrollment-" + v4();
    const param = {
      id,
      courseid,
      studentid,
      dateofassigment,
    };
    const data = {
      TableName: "OrganizationTable",
      Item: param,
    };
    const message = await addData(data);
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>", message);
    return formatJSONResponse({
      message: "New enrollment added",
    });
  } catch (err) {
    return err;
  }
};

export const main = middyfy(enrollStudent);
