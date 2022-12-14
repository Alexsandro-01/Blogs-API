/**
 * @param {import('sequelize').Sequelize} sequelize 
 * @param {import('sequelize').DataTypes} DataTypes
 */
function postCategory(sequelize, DataTypes) {
  const PostCategory = sequelize.define('PostCategory',
    {
      postId: {
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      categoryId: {
        primaryKey: true,
        type: DataTypes.INTEGER
      }
    },
    { 
      tableName: 'PostCategories',
      timestamps: false
    },
  );

  PostCategory.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      as: 'categories',
      through: PostCategory,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });
    models.Category.belongsToMany(models.BlogPost, {
      as: 'blogPosts',
      through: PostCategory,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
  };

  return PostCategory;
};

module.exports = postCategory;