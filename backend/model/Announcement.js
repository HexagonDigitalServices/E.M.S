 title:{
        type:String,
        required: true,
        trim:true
    },
    message:{
        type: String,
        required: true,
        trim:true
    },
    sendTo:{
        type:String,
        required:true,
        enum:["All","Employee"],
        default:"All",
    },
    recipient:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Employee",
        default: null,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true,
    },
    fromDate: {
        type: Date,
        default: null,
    },
    toDate: {
        type: Date,
        default: null,
    },