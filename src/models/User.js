import { AuthUser } from '@rsuite/framework/auth';

class User extends AuthUser {
  // 声明此 model 的字段
  // 主要是与其他 model 的关联
  creator = User;

  // 如果字段不是 model，可以省略
  // name = String;
  // createTime = Number;
}

module.exports = User;
