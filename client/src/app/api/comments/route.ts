import { getAccessToken, getSession } from "@auth0/nextjs-auth0/edge";
import { NextRequest, NextResponse } from "next/server";
const apiURL = process.env.API_SERVER_URL;

export async function GET(req: NextRequest) {
  const session = await getSession();
  const user = session?.user;
  const accessToken = session?.accessToken;
  if (!user || !user.sub) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    if(req.url.includes("projectId")){
      const projectId = req.url.split("=")[1];
      const response = await fetch(`${apiURL}/api/comments?projectId=${projectId}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
  
      if (!response.ok) {
        return NextResponse.json(
          { message: "Request failed" },
          { status: response.status }
        );
      }
  
      return NextResponse.json(await response.json());
    }
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}


export async function DELETE(req: NextRequest) {
  const { accessToken } = await getAccessToken();
  const response = await fetch(`${apiURL}/api/comments/${req}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return NextResponse.json(await response.json());
}

export async function POST(req: NextRequest) {
  const { accessToken } = await getAccessToken();
  const body = await req.json();
  console.log(body);
  const response = await fetch(`${apiURL}/api/comments`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return NextResponse.json(await response.json());
}

export async function PUT(req: NextRequest) {
  const { accessToken } = await getAccessToken();
  const body = await req.json();
  const response = await fetch(`${apiURL}/api/comments/${req}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return NextResponse.json(await response.json());
}

export const runtime = "edge";
