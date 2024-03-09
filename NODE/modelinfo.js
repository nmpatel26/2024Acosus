const mongoose= require("mongoose");

const modelhistoryScehma= new mongoose.Schema(
    {
        mname: String,
        dt: Date,
    },
    {
        collection: "ModelInfo",
    }
);
mongoose.model("ModelInfo", modelhistoryScehma);
