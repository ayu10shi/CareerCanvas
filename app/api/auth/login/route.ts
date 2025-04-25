import { connect } from "@/lib/dbconfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;

        // Input validation
        if (!email || !password) {
            return NextResponse.json(
                { error: "Please provide all required fields" },
                { status: 400 }
            );
        }

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json(
                { error: "Invalid credentials" },
                { status: 401 }
            );
        }

        // Check password
        const validPassword = await bcryptjs.compare(password, user.password);
        if (!validPassword) {
            return NextResponse.json(
                { error: "Invalid credentials" },
                { status: 401 }
            );
        }

        // Include more user data in response
        const userData = {
            id: user._id,
            name: user.name,
            email: user.email,
            bio: user.bio || "",
            location: user.location || "",
            website: user.website || "",
            github: user.github || "",
            linkedin: user.linkedin || "",
        };

        const response = NextResponse.json({
            message: "Login successful",
            success: true,
            user: userData
        });

        // Create token
        const tokenData = {
            id: user._id,
            email: user.email,
            name: user.name
        };

        const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY!, {
            expiresIn: "1d"
        });

        // Set HTTP-only cookie
        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 86400 // 1 day
        });

        return response;

    } catch (error: any) {
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
