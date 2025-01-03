import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please write a title for your event"]
    },
    category: {
        type: String,
        required: [true, "Please select the category"],
        enum: ['Danger', 'Success', 'Primary', 'Warning'],
    },
    eventDate: {
        type: Date,
        required: [true, "Please select the event date"]
    }

});

const Event = mongoose.model("Event", EventSchema);

export default Event;