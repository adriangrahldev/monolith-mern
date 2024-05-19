import { getAccessToken, getSession } from "@auth0/nextjs-auth0/edge";
import { NextRequest, NextResponse } from "next/server";
const apiURL = process.env.API_SERVER_URL;

const handleApiResponse = async (response: Response) => {
  const contentType = response.headers.get("content-type");
  if (!contentType || !contentType.includes("application/json")) {
    console.error("Expected JSON response but received:", contentType);
    throw new TypeError("Expected JSON response");
  }
  const responseData = await response.json();
  if (response.ok) {
    return NextResponse.json(responseData);
  }
  return NextResponse.json(
    { message: responseData.message || "Request failed" },
    { status: response.status }
  );
};

export async function GET(req: NextRequest) {
  const session = await getSession();
  const user = session?.user;
  const accessToken = session?.accessToken;
  if (!user || !user.sub) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  if (req.url.includes("taskId")) {
    const taskId = req.url.split("=")[1];
    try {
      const response = await fetch(`${apiURL}/api/tasks/${taskId}`, {
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
      return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
  } else {
    try {
      if (!req.url.includes("status")) {
        const projectId = req.url.split("projectId=")[1];
        const response = await fetch(
          `${apiURL}/api/tasks?userId=${user.sub}&projectId=${projectId}`,
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
      } else {
        const status = req.url.split("status=")[1];
        const response = await fetch(
          `${apiURL}/api/tasks?userId=${user.sub}&status=${status}`,
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
      }
    } catch (error) {
      return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
  }
}

export async function DELETE(req: NextRequest) {
  const { accessToken } = await getAccessToken();
  const taskId = extractTaskId(req.url);
  if (!taskId) {
    return NextResponse.json(
      { message: "Task ID is missing" },
      { status: 400 }
    );
  }

  const response = await fetch(`${apiURL}/api/tasks/${taskId}`, {
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
  const response = await fetch(`${apiURL}/api/tasks`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: formData,
  });
  return NextResponse.json(await response.json());
}

export async function PUT(req: NextRequest) {
  const session = await getSession();
  const accessToken = session?.accessToken;
  if (!accessToken) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const formData = await req.formData();
  const taskId = extractTaskId(req.url);
  if (!taskId) {
    return NextResponse.json(
      { message: "Task ID is missing" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(`${apiURL}/api/tasks/${taskId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: formData,
    });
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

const extractTaskId = (url: string) => {
  const match = url.match(/taskId=([^&]+)/);
  return match ? match[1] : null;
};

export const runtime = "edge";
