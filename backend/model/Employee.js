 employeeId:{
    type: String,
    required: true,
    unique: true,
    trim: true,
   },
   name:{
    type: String,
    required: true,
    trim: true,
   },
   email:{
    type: String,
    required: true,
    unique: true,
    lowercase: true,
   },
   workEmail:{
    type: String,
    required: true,
    unique: true,
    lowercase: true,
   },
   workPassword:{
    type: String,
    required: true,
   },
   phone:{
    type: Number,
    required: true,
   },
   gender:{
    type: String,
    enum: ["Male", "Female", "Other"],
    required: true,
   },
   department:{
    type: String,
    required: true
   },
   designation:{
    type: String,
    required: true
   },
   salary:{
    type: Number,
    required: true,
   },
   salaryPeriod:{
    type: String,
    default: "monthly",
    required: true
   },
   joiningDate:{
    type: Date,
    required: true
   },
   profileImage:{
    type: String,
    default: "",
   },
   bankName:{
    type: String,
    required: true,
   },
   accountNumber:{
    type: Number,
    required: true,
   },
   ifscCode:{
    type: String,
    required: true,
    uppercase: true,
   },
   accountStatus:{
    type: String,
    enum: ["Active", "Inactive"],
    default: "Active",
   }