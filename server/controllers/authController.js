import User from "../models/user.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import cloudinary from "../config/cloudinary.js";

dotenv.config();

// Utility to generate username from name
function generateUserName(name) {
  return name.trim().toLowerCase().replace(/\s+/g, "") + Math.floor(Math.random() * 1000);
}

// ===== Signup =====
export async function signup(req, res) {
  const { email, password, fullName, userName } = req.body;

  try {
    if (!email || !password || !fullName || !userName) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 8) {
      return res.status(400).json({ message: "Password must be at least 8 characters" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const existingUsername = await User.findOne({ userName });
    if (existingUsername) {
      return res.status(400).json({ message: "Username already taken" });
    }

    const newUser = await User.create({
      email,
      fullName,
      userName,
      password,
      profilePic: "",
    });

    const token = jwt.sign({ userId: newUser._id, role: newUser.role}, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });

    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true, // prevent XSS attacks
      sameSite: "none",
      secure: process.env.NODE_ENV === "production",
    });

    res.status(201).json({ success: true, user: newUser });
  } catch (error) {
    console.log("Signup error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// ===== Login =====
export async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).json({ message: "All fields are required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid email or password" });

    const isPasswordCorrect = await user.matchPassword(password);
    if (!isPasswordCorrect) return res.status(401).json({ message: "Invalid email or password" });

    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });

    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "none",
      secure: process.env.NODE_ENV === "production",
    });

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.log("Login error:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// ===== Logout =====
export function logout(req, res) {
  res.clearCookie("jwt", {
    httpOnly: true,
    sameSite: "none",
    secure: process.env.NODE_ENV === "production",
  });
  res.status(200).json({ success: true, message: "Logout successful" });
}

// ===== Onboard =====
export async function onboard(req, res) {
  try {
    const userId = req.user._id;
    const { fullName, bio, location, userName, existingProfilePic } = req.body;

    // Validate required fields
    if (!fullName || !bio || !location || !userName) {
      return res.status(400).json({
        message: "All fields are required",
        missingFields: [
          !fullName && "fullName",
          !userName && "userName",
          !bio && "bio",
          !location && "location",
        ].filter(Boolean),
      });
    }

    // Check if username is already taken
    const isTaken = await User.findOne({ userName, _id: { $ne: userId } });
    if (isTaken) {
      return res.status(400).json({ message: "Username already taken" });
    }

    // Define function to update user
    const updateUser = async (profilePicUrl) => {
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
          fullName,
          bio,
          location,
          userName,
          profilePic: profilePicUrl,
          isOnboarded: true,
        },
        { new: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({ success: true, user: updatedUser });
    };

    // Handle new profile pic upload
    if (req.file) {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "certifly-profile-pics",
          resource_type: "image",
        },
        async (error, result) => {
          if (error) {
            console.error("Cloudinary upload error:", error);
            return res.status(500).json({ message: "Image upload failed" });
          }

          await updateUser(result.secure_url);
        }
      );

      stream.end(req.file.buffer);
    } else if (existingProfilePic) {
      // Use existing profile pic if no new file uploaded
      await updateUser(existingProfilePic);
    } else {
      return res.status(400).json({
        message: "Profile picture is required",
        missingFields: ["profilePic"],
      });
    }
  } catch (error) {
    console.error("Onboarding error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}



// ===== Forgot Password =====
export async function forgotPassword(req, res) {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found" });

  const token = crypto.randomBytes(32).toString("hex");
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  user.resetPasswordToken = hashedToken;
  user.resetPasswordExpires = Date.now() + 3600000;
  await user.save();


  const baseURL =
   process.env.NODE_ENV === "production"
    ? "https://certi-fly.vercel.app"
    : "http://localhost:5173";
  const resetLink = `${baseURL}/reset-password/${token}`;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  await transporter.sendMail({
    to: user.email,
    from: process.env.GMAIL_USER,
    subject: "Reset your password",
    html: `<a href="${resetLink}">Click here to reset your password</a>`,
  });

  res.json({ message: "Reset link sent to email" });
}

// ===== Reset Password =====
export async function resetPassword(req, res) {
  const { token } = req.params;
  const { password } = req.body;

  const hashedToken = crypto.createHash("sha256").update(req.params.token).digest("hex");
  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!user) return res.status(400).json({ message: "Invalid or expired token" });

  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;;
  await user.save();

  res.json({ message: "Password reset successful" });
}