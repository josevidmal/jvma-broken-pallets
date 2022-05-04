const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema(
    {
        firsName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        company: {
            type: String,
            required: false,
        },
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, 'Must use a valid email address'],
        },
        password: {
            type: String,
            required: true,
        },
        userType: {
            type: String,
            required: true,
        },
        myOffers: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Offer'
            },
        ],
        myPurchases: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Offer'
            }
        ],
    },
    {
        toJSON: {
            virtuals: true,
        },
    }
);

userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next();
});

userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

userSchema.virtual('bookCount').get(function () {
    return this.savedBooks.length;
});

const User = model('User', userSchema);

module.exports = User;