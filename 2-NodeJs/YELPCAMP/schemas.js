const baseJoi = require('joi')
const sanitizeHtml = require('sanitize-html')

const extension = (joi) => ({
    type: 'string',
    base: joi.string(),
    messages: {
        'string.escapeHTML': '{{#label}} must not include HTML! tag'
    },
    rules: {
        escapeHTML : {
            validate(value,helpers) {
                const clean = sanitizeHtml(value, {
                    allowedTags: [],
                    allowedAttibutes: {},
                })
                if (clean !== value) return helpers.error('string.escapeHTML',{value})
                return clean
            }
        }
    }
})

const Joi = baseJoi.extend(extension)

module.exports.campgroundJoiSchema = Joi.object({
    campground: Joi.object({
        title: Joi.string().required().escapeHTML(),
        price: Joi.number().required().min(0),
        // image: Joi.string().required(),
        description: Joi.string().required().escapeHTML(),
        location: Joi.string().required().escapeHTML(),
    }).required(),
    deleteImages: Joi.array(),
})

module.exports.reviewJoiSchema = Joi.object({
    reviews: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        body: Joi.string().required().escapeHTML(),
    }).required()
})