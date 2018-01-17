module.exports = {
  /**
   * 可选值：‘orm', 'store'
   * - orm Auth.setUser(user) 只记录 user.id，
   *    Auth.user() 返回 User.find(id)
   * - store Auth.setUser(user) 记录 user 对象,
   *    Auth.user() 返回 user 对象
   */
  driver: 'orm',
  /**
   * 如果使用 orm driver 需指定使用 model 的 tableName
   * model 须继承 AuthUser（@rsuite/framework/auth)
   */
  model: 'users',
};
