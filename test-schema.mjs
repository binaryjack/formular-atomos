import { f } from "./packages/showcase/node_modules/formular.dev/dist/index.js";

const signUpSchema = f.object({
  firstName: f.string().min(2).nonempty(),
  lastName: f.string().min(2).nonempty(),
  email: f.string().email().nonempty(),
  password: f.string().min(8).nonempty()
});

const data = {
  firstName: "dvsdbsdb",
  lastName: "dbsdbsdb",
  email: "pianatadeo@hotmail.com",
  password: "sdbsdbsdbsdbsdb"
};

const result = signUpSchema.safeParse(data);
console.log(JSON.stringify(result, null, 2));
