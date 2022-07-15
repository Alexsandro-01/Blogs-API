/** 
 * @param {import('sequelize').Sequelize} sequelize
 * @param {import('sequelize').DataTypes} DataTypes
*/
function Users(sequelize, DataTypes) {
  const User = sequelize.define('User', { 
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  },
  {
    timestamps: false,
  });

  User.associate = (model) => {
    User.hasMany(model.BlogPost, { key: 'id', as: 'BlogPosts' });
  }
  return User;
}

module.exports = Users;