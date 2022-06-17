import { Request, Response } from "express";
import Users from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { generateActiveToken } from "../config/generateToken";
import sendMail from "../config/sendMail";
import { validateEmail, validPhone } from "../middleware/valid";
import { sendSms } from "../config/sendSMS";

const CLIENT_URL = `${process.env.BASE_URL}`;

const authCtrl = {
  register: async (req: Request, res: Response) => {
    try {
      const { name, account, password } = req.body;

      const user = await Users.findOne({ account });
      if (user)
        return res
          .status(400)
          .json({ msg: "Email or Phone number already exists." });

      const passwordHash = await bcrypt.hash(password, 12);

      const newUser = { name, account, password: passwordHash };

      const active_token = generateActiveToken({ newUser });

      const url = `${CLIENT_URL}/active/${active_token}`;

      if (validateEmail(account)) {
        sendMail(account, url, "Verify your email address");
        return res.json({ msg: "Success! Please check your email." });
      } else if (validPhone(account)) {
        sendSms(account, url, "Verify your phone number");
        return res.json({ msg: "Success! Please check phone." });
      }
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
  activeAccount: async (req: Request, res: Response) => {
    try {
      const { active_token } = req.body;

      const decoded = jwt.verify(
        active_token,
        `${process.env.ACTIVE_TOKEN_SECRET}`
      );

      console.log(decoded);
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

export default authCtrl;
