const StatusTypeInject = require("./StatusType");
const UserTypeInject = require("./UserType");

const types = {};

types.StatusType = StatusTypeInject(types);
types.UserInformationType = UserTypeInject(types);

const StatusType = types.StatusType;
const UserInfoType = types.UserInformationType;

module.exports = { UserInfoType, StatusType };
