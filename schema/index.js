import { gql, UserInputError } from "apollo-server-express"
// import Event from "../models/Event"
// import Category from "../models/Category"
// import User from "../models/User"
import Query from '../resolvers/queries';
import Mutation from "../resolvers/mutations"

// const AWS = require("aws-sdk")
// const jsonwebtoken = require("jsonwebtoken")
// require("dotenv").config()




export const typeDefs = gql`
	type Query {
		message: String!
		events(data: eventsQueryInput): [Event]
		event(id: ID!): Event
		categories(filter: [ID!]): [Category]
		loginUser(data: loginUser!): LoginUserPayload
		user(id: ID!): User
		city(id: ID, name: String, googlePlaceId: String): City
	}

	type Mutation {
		createEvent(data: CreateEventInput!): CreateEventPayload
		updateEvent(data: UpdateEventInput!): UpdateEventPayload
		deleteEvent(id: ID!): DeleteEventPayload

		createCategory(data: CreateCategoryInput): CreateCategoryPayload
		updateCategory(data: updateCategoryInput): UpdateCategoryPayload

		createUser(data: CreateUserInput): CreateUserPayload
		updateUser(data: UpdateUserInput): UpdateUserPayload
		sendOtp(data: SendOtpInput): SendOtpPayload

		createCity(data: CreateCityInput): CreateCityPayload

		socialLogin(data: SocialLoginInput) : SocialLoginPayload
	}

	input CreateCityInput {
		name: String!
		lat: Float!
		lng: Float!
		googlePlaceId: String!
		country: String!
	}

	type CreateCityPayload {
		status: Int
		city: City
	}

	type City {
		id: ID!
		name: String!
		lat: Float!
		lng: Float!
		googlePlaceId: String!
		country: String!
	}

	input SendOtpInput {
		type: OtpTypes!
		value: String!
		isSignup: Boolean!
	}

	type SendOtpPayload {
		success: Boolean
		status: Int
	}

	type SocialLogins {
		type: SocialTypes
		auth: String
	}

	type Emails {
		priority: Int
		value: String
		verified: Boolean
	}

	type User {
		id: ID!
		phone: String
		emails: [Emails]
		name: String
		saved: [UserSavedEvent]
		otp: String
		preferences: [UserPreference]
		profileImage: String
		socialLogins: [SocialLogins]
	}

	type UserSavedEvent {
		id: String
		name: String
		imageUrl: String
	}

	input UserSavedEventInput {
		id: String
		name: String
		imageUrl: String
	}

	type UserPreference {
		id: ID!
		name: String!
		subs: [Sub]
	}

	input loginUser {
		type: OtpTypes!
		value: String!
		otp: String!
	}

	type LoginUserPayload {
		token: String!
		user: User
	}

	type UpdateUserPayload {
		user: User
	}

	input UpdateUserInput {
		id: ID!
		phone: String
		name: String
		saved: [UserSavedEventInput]
		preferences: [UserPreferenceInput]
		profileImage: String
	}

	input UserPreferenceInput {
		id: ID!
		name: String!
		subs: [SubInputType]
	}

	input CreateUserInput {
		name: String!
		phone: String!
	}

	type CreateUserPayload {
		user: User
	}

	input CreateEventInput {
		title: String!
		type: String!
		isPaid: Boolean!
		venue: VenueInput
		startDate: String
		startTime: String
		endTime: String
		userId: String
		user: CreateEventUserInput
		isOnline: Boolean
		occurrences: [OccurrenceInput]
		outcomes: [OutcomeInput]
	}

	input CreateEventUserInput {
		id: String
		name: String
	}

	type CreateEventPayload {
		event: Event
	}

	type DeleteEventPayload {
		success: Boolean
	}

	input UpdateEventInput {
		id: ID!
		isLive: Boolean
		title: String
		venue: VenueInput
		description: String
		isOnline: Boolean
		isPaid: Boolean
		images: [ImageInput]
		outcomes: [OutcomeInput]
		occurrences: [OccurrenceInput]
	}

	type UpdateEventPayload {
		event: Event
	}

	type Event {
		id: ID!
		title: String!
		type: String
		isPaid: Boolean
		venue: Venue
		description: String
		images: [Image]
		imageUrl: String
		startDate: String
		startTime: String
		endTime: String
		userId: String
		user: EventUser
		occurrences: [Occurrence]
		outcomes: [Outcome]
		isOnline: Boolean!
		slug: String!
		isLive: Boolean!
	}

	type Image {
		url: String!
	}

	input ImageInput {
		type: String!
		encodedData: String!
	}

	type EventUser {
		id: String
		name: String
	}

	type Outcome {
		category: String
		categoryId: String
		heading: String
		subCategories: [Sub]
	}

	input OutcomeInput {
		category: String
		categoryId: String
		heading: String
		subCategories: [SubInputType]
	}

	type Occurrence {
		startDate: String
		startTime: String
		endTime: String
	}

	input OccurrenceInput {
		startDate: String
		startTime: String
		endTime: String
	}

	type Venue {
		name: String!
		address: String!
		city: String
		cityId: String
		state: String!
		country: String!
		pincode: String!
	}

	input VenueInput {
		name: String!
		address: String!
		city: String
		cityId: String
		state: String!
		country: String!
		pincode: String!
	}

	type Category {
		id: ID!
		name: String!
		heading: String
		subs: [Sub]
	}

	input CreateCategoryInput {
		name: String!
	}

	type CreateCategoryPayload {
		id: ID!
		name: String!
	}

	input updateCategoryInput {
		id: ID!
		name: String
		heading: String
		subs: [SubInputType]
	}

	type UpdateCategoryPayload {
		category: Category
	}

	input SubInputType {
		id: ID
		name: String!
	}

	type Sub {
		id: ID!
		name: String!
	}

	input eventsQueryInput {
		isOnline: Boolean
		userId: String
		isLive: Boolean
		cityId: String
	}

	enum SocialTypes {
		facebook
		linkedIn
		twitter
		google
	  }

	input SocialLoginInput {
		email: String!
		name: String!
		phone: String!
		token: String!
		type: SocialTypes!
	}

	type SocialLoginPayload {
		success: Boolean
		user: User
		message: String
	}

	enum OtpTypes {
		phone
		email
	}

`

export const resolvers = {
	Query,
	Mutation
}
