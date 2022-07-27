import mongoose from "mongoose";

const AccountSchema = new mongoose.Schema({
  accountId: {
    type: Number,
    min: 1000,
    max: 999999,
    required: true,
    unique: true,
  },
  owners: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  type: {
    type: String,
    enum: {
      values: ["Business", "Private", "Company"],
      message: "The inserted Business is not supported",
    },
    required: true,
    default: "Business",
  },
  balance: {
    type: Number,
    default: function () {
      if (this.type === "Company") {
        return 100;
      } else {
        return 500;
      }
    },
    // validate: function (): boolean {
    //     if (this.type === "Company" && this.balance === 0) {
    //         return false;
    //     } else {
    //         return true
    //     }
    // }
  },
});

export const Account = mongoose.model("AccountOperation", AccountSchema);
