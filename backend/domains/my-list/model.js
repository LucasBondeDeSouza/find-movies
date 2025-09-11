import { model, Schema } from "mongoose"

const myListSchema = new Schema({
    owner: { type: Schema.Types.ObjectId, ref: "User" },
    id_movie: String,
    type: { type: String, enum: ["movie", "tv"] },
    status: { type: String, enum: ["planned", "watching", "watched"], default: "planned" },
    created_at: { type: Date, default: Date.now }
})

myListSchema.index({ owner: 1, id_movie: 1, type: 1 }, { unique: true });

export default model("MyList", myListSchema)