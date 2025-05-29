import { Joi, Segments, celebrate } from "celebrate";

export const createUserSchema = celebrate(
  {
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required().trim(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  },
  {
    abortEarly: false,
  }
);

export const loginSchema = celebrate(
  {
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  },
  {
    abortEarly: false,
  }
);

export const createCategorySchema = celebrate(
  {
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required().trim(),
    }),
  },
  {
    abortEarly: false,
  }
);

export const createCarSchema = celebrate(
  {
    [Segments.BODY]: Joi.object().keys({
      brand: Joi.string().required().trim(),
      carModel: Joi.string().required().trim(),
      price: Joi.number().required().min(0),
      available: Joi.boolean().optional(),
      category: Joi.string().uuid().optional(),
      createdBy: Joi.string().uuid().optional(),
      purchasedBy: Joi.string().uuid().allow(null).optional(),
    }),
  },
  { abortEarly: false }
);

export const getCarsQuerySchema = celebrate(
  {
    [Segments.QUERY]: Joi.object().keys({
      brand: Joi.string().trim().optional().empty(""),
      model: Joi.string().trim().optional().empty(""),
      minPrice: Joi.number().min(0).optional().empty(""),
      maxPrice: Joi.number().min(0).optional().empty(""),
      available: Joi.boolean().optional().empty(""),
      page: Joi.number().integer().min(1).optional().empty("").default(1),
      limit: Joi.number()
        .integer()
        .min(1)
        .max(100)
        .optional()
        .empty("")
        .default(10),
    }),
  },
  { abortEarly: false }
);

export const carParamSchema = celebrate(
  {
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().uuid({ version: "uuidv4" }).required(),
    }),
  },
  { abortEarly: false }
);

export const updateCarSchema = celebrate(
  {
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().required(),
    }),
    [Segments.BODY]: Joi.object().keys({
      model: Joi.string().optional().trim(),
      category: Joi.string().optional().trim(),
      price: Joi.number().optional(),
    }),
  },
  {
    abortEarly: false,
  }
);
