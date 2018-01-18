import { Model } from '@rsuite/framework/orm';
import User from './User';

class UserGroup extends Model {
  // 必须声明 tableName
  static tableName = 'usergroups';

  creator = User;
}

module.exports = UserGroup;
