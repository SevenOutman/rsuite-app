import { Model } from '@rsuite/framework/orm';
import User from './User';

class UserGroup extends Model {

  creator = User;
}

module.exports = UserGroup;
