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
  if (req.url.includes("projectId")) {
    const projectId = req.url.split("=")[1];
    try {
      const response = await fetch(`${apiURL}/api/projects/${projectId}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (!response.ok) {
        return NextResponse.json(
          { message: "Request failed" },
          { status: response.status }
        );
      }

      return NextResponse.json(await response.json());
    } catch (error) {
      console.error("Failed to fetch project:", error);
      return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
  } else {
    try {
      const response = await fetch(
        `${apiURL}/api/projects?userId=${user.sub}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      if (!response.ok) {
        return NextResponse.json(
          { message: "Request failed" },
          { status: response.status }
        );
      }

      return NextResponse.json(await response.json());
    } catch (error) {
      console.error("Failed to fetch data:", error);
      return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
  }
}

export async function DELETE(req: NextRequest) {
  const { accessToken } = await getAccessToken();
  const projectId = req.url.split("projectId=")[1];
  const response = await fetch(`${apiURL}/api/projects/${projectId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return NextResponse.json(await response.json());
}
export async function POST(req: NextRequest) {
  const { accessToken } = await getAccessToken();
  const formData = await req.formData();
  const response = await fetch(`${apiURL}/api/projects`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: formData,
  });
  return NextResponse.json(await response.json());
}

export async function PUT(req: NextRequest) {
  const { accessToken } = await getAccessToken();
  const formData = await req.formData();
  console.log(formData);
  const projectId = req.url.split("projectId=")[1];
  const response = await fetch(`${apiURL}/api/projects/${projectId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: formData,
  });
  console.log(response);
  return NextResponse.json(await response.json());
}

export const runtime = "edge";
