import mongoose, { Schema } from "mongoose";

const companySchema = new Schema({
    name: {
      type: String,
      required: true,
    },
    registerNumber: {
      type: String,
      required: true,
    },
    incorporationDate: {
      type: Date,
      required: true,
    },
    vatNumber: {
      type: String,
    },
    address: {
      street: String,
      city: String,
      country: String,
    },
    contact: {
      phone: String,
      website: String,
      email: String,
    },
    documents: [
        {
          name: {
            type: String,
            required: true,
          },
          type: {
            type: String,
            required: true,
          },
        },
      ],
    teams: {
      count: Number,
      membersCount: Number,
    },
  },{
    timestamps: true,
  });
  
  const Company = mongoose.model("Company", companySchema);

  export default Company;
  
  