/**
 * @param {import('sequelize').Sequelize} sequelize
 * @param {import('sequelize').DataTypes} DataTypes
 */
function BlogPosts(sequelize, DataTypes) {
  const blogPost = sequelize.define('BlogPost', {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER
    },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: {
      type:  DataTypes.INTEGER,
      foreignKey: true,
    },
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  },
  {
    createdAt: 'published',
    updatedAt: 'updated',
  });

  blogPost.associate = (model) => {
    blogPost.belongsTo(model.User, { foreignKey: 'id', as: 'user'});
  }

  return blogPost;
}

module.exports = BlogPosts;