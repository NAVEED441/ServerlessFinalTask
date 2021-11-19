import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
import { formatJSONResponse } from "@libs/apiGateway";
import { addData } from "@libs/dynamodb";
import { middyfy } from "@libs/lambda";

import { v4 } from "uuid";
import schema from "./schema";

const addCourse: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  try {
    const { coursecode, coursetitle, CH } = event.body;
    const id = "course-" + v4();

    const param = {
      id,
      coursecode,
      coursetitle,
      CH,
    };
    const data = {
      TableName: "OrganizationTable",
      Item: param,
    };
    const res = await addData(data);
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>", res);
    return formatJSONResponse({
      message: "New course created",
    });
  } catch (err) {
    return err;
  }
};

export const main = middyfy(addCourse);
