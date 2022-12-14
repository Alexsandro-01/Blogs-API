const Joi = require('joi');
const { Op } = require('sequelize');

const model = require('../database/models');
const throwError = require('../utils/throwError');

async function validatePostContent(data) {
  const schema = Joi.object({
    title: Joi.string().required().max(255),
    content: Joi.string().required().max(255),
  });
  
  const responsePost = schema.validate(data);
  if (responsePost.error) {
    throwError('clientError', 'Some required fields are missing');
  }
}

async function validatePost(data) {
  const arraySchema = Joi.array().items(Joi.number().required());

  const { categoryIds, ...post } = data;
  await validatePostContent(post);

  const responseCategoryIds = arraySchema.validate(categoryIds);

  if (responseCategoryIds.error) {
    throwError('clientError', '"categoryIds" not found');
  }
}

async function ExistCategorys(categories) {
  const existCategory = await Promise.all(categories.map((id) => {
    const category = model.Category.findOne({
      where: { id },
    });
    return category;
  }));

  existCategory.forEach((category) => {
    if (!category) {
      throwError('clientError', '"categoryIds" not found');
    }
  });
}

async function create(data) {
  const { categoryIds, ...post } = data;
  const response = await model.BlogPost.create(post);
  const newPost = response.toJSON();

  await model.PostCategory.bulkCreate(categoryIds.map((categoryId) => (
    {
      postId: newPost.id,
      categoryId,
    }
  )));

  return newPost;
}

async function getAll() {
  const posts = await model.BlogPost.findAll(
    {
      include: [
        {
          model: model.User,
          as: 'user',
          attributes: { exclude: ['password'] },
        },
        { 
          model: model.Category,
          as: 'categories',
          through: { attributes: [] },
        },
      ],
    },
  );

  return posts;
}

async function getById(postId) {
  const post = await model.BlogPost.findOne({
    where: { id: postId },
    include: [
      {
        model: model.User,
        as: 'user',
        attributes: { exclude: ['password'] },
      },
      {
        model: model.Category,
        as: 'categories',
        through: { attributes: [] },
      },
    ],
  });

  if (!post) throwError('notFound', 'Post does not exist');

  return post;
}

async function getByQuery(query) {
  const posts = await model.BlogPost.findAll({
    where: {
      [Op.or]: [
        { title: { [Op.like]: `%${query}%` } },
        { content: { [Op.like]: `%${query}%` } },
      ],
    },
    include: [
      {
        model: model.User, as: 'user', attributes: { exclude: ['password'] },
      },
      {
        model: model.Category, as: 'categories', through: { attributes: [] },
      },
    ],
  });
  return posts;
}

async function updateById(post, postId, userId) {
  await validatePostContent(post);

  const response = await model.BlogPost.findOne({
     where: { id: postId },
    });
  
  const POST = response.toJSON();

  if (POST.userId !== userId) {
    throwError('JsonWebTokenError', 'Unauthorized user');
  }

  const updatedPost = await model.BlogPost.update(
    { ...post },
    { where: { id: postId } },
  );

  if (updatedPost[0] === 1) {
    return getById(postId);
  }
}

async function remove(postId, userId) {
  const post = await model.BlogPost.findOne({
    where: { id: postId },
    attributes: ['id', 'userId'],
  });

  if (!post) {
    throwError('notFound', 'Post does not exist');
  }

  if (post.dataValues.userId !== userId) {
    throwError('JsonWebTokenError', 'Unauthorized user');
  }

  await model.BlogPost.destroy({
    where: {
      id: postId,
      userId,
    },
  });
}

module.exports = {
  validatePost,
  ExistCategorys,
  create,
  getAll,
  getById,
  getByQuery,
  updateById,
  remove,
};