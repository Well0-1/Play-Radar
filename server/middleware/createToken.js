import jwt from "jsonwebtoken";
import { config } from "dotenv";

// You can use your own access token here or set it as an environment variable
// It can be whatever you want
const VAR_ACCESS_TOKEN = "your-access-token-here";

config();

// You can create a token using the following code

const user = { id: 0, name: "John Doe" };

const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN);
console.log("Your Token:", accessToken);
