import mongoose, {Model, Schema, model} from "mongoose"
import { IUser} from "@/types/User"

const UserSchema: Schema<IUser> = new Schema({
    name : {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
    }
  },
  {
    timestamps: true
  }
);

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", UserSchema) 

export default User;