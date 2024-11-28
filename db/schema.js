const mongoose = require('mongoose');
let schema = mongoose.Schema;

/**
 * This is the event schema
 */
let eventSchema = new schema({
    eventName: {
        type: String,
        required: true,
    },
    eventDate: {
        type: Date,
        required: true,
    },
    eventLocation: {
        type: String,
        required: true,
    },
    eventDescription: {
        type: String,
        required: true,
    },
    eventImage: {
        type: String
    },
    /** Define a relationship between Event and Task */
    tasks: [{
        type: schema.Types.ObjectId,
        ref: 'Task', /** This references the Task model */
    }]
});

/**
 * User Schema
 */
let userSchema = new schema({
    firstname: {
        type: String,
        required: false,
        default: null,
    },
    lastname: {
        type: String,
        required: false,
        default: null,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: false,
        default: null,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    otp: {
        type: Number,
        default: null
    },
    otpExpires: {
        type: Date,
        default: null,
    },
    userType: {
        type: String,
        enum: ['Admin', 'Moderator', 'User'],
        required: true,
    },
});

/**
 * Task Schema
 * Task is related to both an Event and a User
 */
let taskSchema = new schema({
    taskName: {
        type: String,
        required: true,
    },
    taskDescription: {
        type: String,
        required: true,
    },
    taskDate: {
        type: Date,
        required: true,
    },
    taskLocation: {
        type: String,
        required: true,
    },
    taskImage: {
        type: String,
        required: false,
    },
    taskAssignedTo: {
        type: schema.Types.ObjectId,
        ref: 'User', // References the User model for the user assigned to the task
    },
    taskAssignedBy: {
        type: schema.Types.ObjectId,
        ref: 'User', // References the User model for the user who assigned the task
    },
    taskStatus: {
        type: String,
        enum: ['Pending', 'In Progress', 'Completed'],
        required: true,
    },
    event: {
        type: schema.Types.ObjectId,
        ref: 'Event', // References the Event model for the event the task belongs to
    },
});

// Create models from the schemas
const Event = mongoose.model('Event', eventSchema);
const User = mongoose.model('User', userSchema);
const Task = mongoose.model('Task', taskSchema);

// Export the models
module.exports = {
    Event,
    User,
    Task
};
