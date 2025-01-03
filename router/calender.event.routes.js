import { Router } from "express";
import Event from "../models/calender.event.model.js";
import handleEventErrors from "../utlis/eventError.js";
import { body, validationResult } from "express-validator";

const router = Router();

// Route to fetch all events
router.get("/get", async (req, res) => {
    try {
        const events = await Event.find({});
        res.status(200).json(events);
    } catch (err) {
        handleEventErrors(err, res);
    }
});

// Route to fetch a single event by ID
router.get("/:id/show", async (req, res) => {
    const id = req.params.id;
    try {
        const event = await Event.findById(id);
        if (!event) {
            return res.status(404).json({ error: "Event not found" });
        }
        res.status(200).json(event);
    } catch (err) {
        handleEventErrors(err, res);
    }
});

// Route to create a new event
router.post(
    "/",
    [
        body("title").notEmpty().withMessage("Please write a title for your event"),
        body("category")
            .isIn(["Danger", "Success", "Primary", "Warning"])
            .withMessage("Please select a valid category"),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors.array());  // Log the errors
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const newEvent = new Event(req.body);
            const savedEvent = await newEvent.save();
            res.status(201).json(savedEvent); // 201 for created
        } catch (err) {
            handleEventErrors(err, res);
        }
    }
);

// Route to update an existing event by ID
router.patch("/:id/update", async (req, res) => {
    const id = req.params.id;
    try {
        const event = await Event.findById(id);
        if (!event) {
            return res.status(404).json({ error: "Event not found" });
        }
        Object.assign(event, req.body); // Update only provided fields
        const updatedEvent = await event.save();
        res.status(200).json(updatedEvent);
    } catch (err) {
        handleEventErrors(err, res);
    }
});

// Route to delete an event by ID
router.delete("/:id/delete", async (req, res) => {
    const id = req.params.id;
    try {
        const event = await Event.findByIdAndRemove(id);
        if (!event) {
            return res.status(404).json({ error: "Event not found" });
        }
        res.status(204).send(); // 204 for successful deletion without content
    } catch (err) {
        handleEventErrors(err, res);
    }
});

export default router;