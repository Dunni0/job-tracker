import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route"; 
import { NextResponse } from "next/server";
import connectToDB from "../../../../lib/db";
import Job from "../../../../models/job";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectToDB();
    const jobs = await Job.find({ userId: session.user.id }).sort({
      createdAt: -1,
    });

    return NextResponse.json(jobs, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectToDB();
    const { company, role, location, status, url, notes } = await req.json();

    if (!company || !role) {
      return NextResponse.json(
        { message: "Company and role are required" },
        { status: 400 }
      );
    }

    const job = await Job.create({
      userId: session.user.id,
      company,
      role,
      location,
      status,
      url,
      notes,
    });

    return NextResponse.json(job, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}