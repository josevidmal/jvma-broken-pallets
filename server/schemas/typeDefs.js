const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        firstName: String
        lastName: String
        company: String
        username: String
        email: String
        password: String
        userType: String
        myOffers: [Offer]!
        myPurchases: [Offer]!
    }

    type Offer {
        _id: ID
        seller: String
        palletQty: Int
        price: Float
        material: String
        dimension: String
        address: String
        state: String
        offerStatus: String
        image: String
        dateCreated: String
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        user: User
        me: User
        offers: [Offer]
    }

    type Mutation {
        loginUser(email: String!, password: String!): Auth
        addUser(firstName: String!, lastName: String!, company: String!, username: String!, email: String!, password: String!, userType: String!): Auth
        addOffer(palletQty: Int!, price: Float!, material: String!, dimension: String!, address: String!, state: String!, image: String): Offer
        addPurchase(offerId: ID!): Offer
        removeOffer(offerId: ID!): Offer
    }
`