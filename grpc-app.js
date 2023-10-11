const PROTO_PATH = "./user.proto";

const grpc = require("@grpc/grpc-js");
const protoLoader=require('@grpc/proto-loader')

console.log("HATA ÇIKTIKTAN SONRA 1");
const option={
  keepCase: true,
  longs: String,
  enums: String,
  arrays: true
}
const packageDefinition=protoLoader.loadSync(PROTO_PATH,{
  keepCase: true,
  longs: String,
  enums: String,
  arrays: true
})
console.log("HATA ÇIKTIKTAN SONRA 2");

const userProto = grpc.loadPackageDefinition(packageDefinition);
const server = new grpc.Server();

server.addService(userProto.UserService.service, {
  createUserName: (call, callback) => {
    const convertEmail = call.request.email.split("@");
    const userName = convertEmail[0];
    callback(null, { userName });
  },
});

server.bindAsync(
  "127.0.0.1:5000",
  grpc.ServerCredentials.createInsecure(),
  (error, port) => {
    server.start();
    console.log("5000 portu çalıştı");
  }
);
