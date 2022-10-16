import { AnyZodObject } from "zod";

const validate_object = (req_object: any, schema: AnyZodObject) => {
    try {
      schema.parse(req_object);
      return true;
    } catch (error) {
      return false;
    }
  };

export default validate_object;
