import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import crypto from "crypto";
import sendEmail from "../utils/sendMail.js";


export const register = async (req, res) => {
  try {
    const { name, email, password, gender, age, dob, contact, address } =
      req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        status: "Error",
        message: "User already exists with this email",
      });
    }

    const user = await User.create({
      name,
      email,
      password,
      gender,
      age,
      dob,
      contact,
      address,
    });

    const token = generateToken({ id: user._id });

    res.status(201).json({
      status: "Success",
      message: "User registered successfully",
     
      token,
    });
  } catch (error) {
    
    res.status(500).json({
      status: "Error",
      message: error.message || "Server error",
    });
  }
};


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({
        status: "Error",
        message: "Invalid email or password",
      });
    }

    const token = generateToken({ id: user._id });

    user.password = undefined;

    res.status(200).json({
      status: "Success",
      message: "User logged in successfully",
      user,
      token,
    });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: error.message || "Server error",
    });
  }
};


export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        status: "Error",
        message: "User not found",
      });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

    await user.save();

    const resetLink = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

  
      await sendEmail({
        to: user.email,
        subject: "Reset Your Password",
        html: `
    <div style="font-family: Arial, Helvetica, sans-serif; background-color: #f4f6f9; padding: 40px 20px;">
      <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">

    
        <div style="background: #2563eb; padding: 25px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0;">Password Reset</h1>
        </div>

        
        <div style="padding: 30px;">
          <h2 style="color: #333;">Hello ${user.name},</h2>

          <p style="color: #555; line-height: 1.6;">
            We received a request to reset your account password.
            Click the button below to create a new password.
          </p>

          <div style="text-align: center; margin: 30px 0;">
            <a
              href="${resetLink}"
              style="
                background: #2563eb;
                color: #ffffff;
                text-decoration: none;
                padding: 14px 30px;
                border-radius: 8px;
                display: inline-block;
                font-weight: bold;
                font-size: 16px;
              "
            >
              Reset Password
            </a>
          </div>

          <div style="
            background: #f8fafc;
            border-left: 4px solid #2563eb;
            padding: 15px;
            border-radius: 6px;
            margin-bottom: 20px;
          ">
            <p style="margin: 0; color: #555;">
              ⏳ This link will expire in <strong>15 minutes</strong>.
            </p>
          </div>

          <p style="color: #555; line-height: 1.6;">
            If you didn't request a password reset, you can safely ignore this email.
            Your password will remain unchanged.
          </p>
        </div>

      
        <div style="
          background: #f8fafc;
          padding: 20px;
          text-align: center;
          border-top: 1px solid #e5e7eb;
        ">
          <p style="margin: 0; color: #888; font-size: 14px;">
            © ${new Date().getFullYear()} Your Application. All rights reserved.
          </p>
        </div>

      </div>
    </div>
  `,
      });

    res.status(200).json({
      status: "Success",
      message: "Password reset link sent successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: error.message || "Server error",
    });
  }
};


export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
    }).select("+password");

    if (!user) {
      return res.status(400).json({
        status: "Error",
        message: "Invalid reset token",
      });
    }

    if (user.resetPasswordExpire < Date.now()) {
      return res.status(400).json({
        status: "Error",
        message: "Reset token has expired",
      });
    }

    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(200).json({
      status: "Success",
      message: "Password reset successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: error.message || "Server error",
    });
  }
};


export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        status: "Error",
        message: "User not found",
      });
    }

    res.status(200).json({
      status: "Success",
      user,
    });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: error.message || "Server error",
    });
  }
};


export const updateProfile = async (req, res) => {
  try {
    const { name, gender, age, dob, contact, address } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        status: "Error",
        message: "User not found",
      });
    }

    user.name = name || user.name;
    user.gender = gender || user.gender;
    user.age = age || user.age;
    user.dob = dob || user.dob;
    user.contact = contact || user.contact;
    user.address = address || user.address;

    await user.save();

    res.status(200).json({
      status: "Success",
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: error.message || "Server error",
    });
  }
};


