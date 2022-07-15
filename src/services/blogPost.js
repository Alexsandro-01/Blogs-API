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

module.exports = {
  validatePost,
  ExistCategorys,
  create,
};