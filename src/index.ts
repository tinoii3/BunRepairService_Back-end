import { Elysia } from "elysia";
import { jwt } from "@elysiajs/jwt";
import { cors } from "@elysiajs/cors";
import { UserController } from "./controllers/UserController";
import { DeviceController } from "./controllers/DeviceController";
import { DepartmentController } from "./controllers/DepartmentController";
import { SectionController } from "./controllers/SectionController";
import { RepairRecordController } from "./controllers/RepairRecordController";
import { CompanyController } from "./controllers/CompanyController";

const checkSignIn = async ({ jwt, request, set }: any) => {
  const token = request.headers.get("Authorization")?.split(" ")[1];

  if (!token) {
    set.status = 401;
    return 'Unauthorized';
  }

  const payload = await jwt.verify(token, 'secret');

  if (!payload) {
    set.status = 401;
    return 'Unauthorized';
  }
};

const app = new Elysia()
.use(cors())
.use(jwt({
  name: "jwt",
  secret: "secret",
}))

// users
.get("/", () => "Hello Elysia")
.post("/api/user/signin", UserController.signIn)
.put("/api/user/update", UserController.update)
.get("/api/user/list", UserController.list)
.post("/api/user/create", UserController.create)
.put("/api/user/updateUser/:id", UserController.updateUser)
.delete("/api/user/remove/:id", UserController.remove)
.get("/api/user/list/engineers", UserController.listEngineer)

// device
.post("/api/device/create", DeviceController.create)
.get("/api/device/list", DeviceController.list)
.put("/api/device/update/:id", DeviceController.update)
.delete("/api/device/remove/:id", DeviceController.remove)

// department
.get("/api/department/list", DepartmentController.list)

// section
.get("/api/section/listByDepartment/:departmentId", SectionController.listByDepartment)

// repair record
.post("/api/repairRecord/create", RepairRecordController.create)
.get("/api/repairRecord/list", RepairRecordController.list)
.put("/api/repairRecord/update/:id", RepairRecordController.update)
.delete("/api/repairRecord/remove/:id", RepairRecordController.remove)
.put("/api/repairRecord/updateStatus/:id", RepairRecordController.updateStatus)
.put("/api/repairRecord/receive", RepairRecordController.receive)
.get("/api/income/report/:startDate/:endDate", RepairRecordController.report)
.get("/api/repairRecord/dashboard", RepairRecordController.dashboard)

// company
.get("/api/company/info", CompanyController.info, { beforeHandle: checkSignIn }) // use middleware to check token
.put("/api/company/update", CompanyController.update)

//listen
.listen(3001);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
