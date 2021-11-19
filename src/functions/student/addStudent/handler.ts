import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
import { formatJSONResponse } from "@libs/apiGateway";
import { addData, checkdataifExist, getData } from "@libs/dynamodb";
import { middyfy } from "@libs/lambda";

import { v4 } from "uuid";
import schema from "./schema";

const addStudent: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  try {
    const { name, email, age, dob } = event.body;
    const id = "student-" + v4();
    const param = {
      id,
      name,
      email,
      age,
      dob,
    };
    const data = {
      TableName: "OrganizationTable",
      Item: param,
    };
    const checkparam = {
      name,
      email,
    };

    const check = await checkdataifExist(checkparam);
    if (check.Count > 0) {
      console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>" + check.Count);
      return formatJSONResponse({
        message: "This student already exits",
      });
    } else {
      const res = await addData(data);
      return formatJSONResponse({
        message: "New Student Created",
      });
    }
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>");
  } catch (err) {
    return err;
  }
};

export const main = middyfy(addStudent);
