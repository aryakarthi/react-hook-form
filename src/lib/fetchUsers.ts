import { z } from "zod";
// import { BasicUserSchema } from "../zod/User";
// import { UserSchemaWithAddress } from "../zod/User";
import { UserSchemaWithGeo } from "../zod/User";

// const UserResults = z.array(BasicUserSchema);
// const UserResults = z.array(UserSchemaWithAddress);
const UserResults = z.array(UserSchemaWithGeo);

type UserArray = z.infer<typeof UserResults>;

const fetchUsers = async (): Promise<UserArray | undefined> => {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");

    if (!res.ok) return undefined;

    const usersJson: UserArray = await res.json();

    const parsedData = UserResults.parse(usersJson);

    console.log(parsedData);

    return parsedData;
  } catch (error) {
    if (error instanceof Error) console.log(error.stack);
  }
};

export default fetchUsers;
