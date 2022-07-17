const Joi = require('joi');
const model = require('../database/models');

const throwError = require('../utils/throwError');

async function validatePost(data) {
  const schema = Joi.object({
    title: Joi.string().required().max(255),
    content: Joi.string().required().max(255),
  });

  const arraySchema = Joi.array().items(Joi.number().required());

  const { categoryIds, ...post } = data;
  const responsePost = schema.validate(post);
  if (responsePost.error) {
    throwError('clientError', 'Some required fields are missing');
  }

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
      // attributes: { exclude: ['UserId'] },
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

async function getById({ value }) {
  const post = await model.BlogPost.findOne({
    where: { id: value },
    attributes: { exclude: ['UserId'] },
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

module.exports = {
  validatePost,
  ExistCategorys,
  create,
  getAll,
  getById,
};