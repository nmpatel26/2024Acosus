const mongoose= require("mongoose");

const modelresponseScehma= new mongoose.Schema(
    {
        email: String,
        mresult: Number,
    },
    {
        collection: "ModelResponses",
    }
);
// const modelResponse = mongoose.model('ModelResponse', modelResponseSchema);
mongoose.model("ModelResponses", modelresponseScehma);
