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

const extractClientId = (url: string) => {
  const match = url.match(/clientId=([^&]+)/);
  return match ? match[1] : null;
};

export async function GET(req: NextRequest) {
  const session = await getSession();
  const user = session?.user;
  const accessToken = session?.accessToken;
  if (!user || !accessToken) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const clientId = extractClientId(req.url);
  const url = clientId
    ? `${apiURL}/api/clients/${clientId}`
    : `${apiURL}/api/clients?userId=${user.sub}`;
  try {
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return await handleApiResponse(response);
  } catch (error) {
    console.error(`Failed to fetch ${clientId ? "client" : "clients"}:`, error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

// DELETE Function
export async function DELETE(req: NextRequest) {
  const session = await getSession();
  const accessToken = session?.accessToken;
  if (!accessToken) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const clientId = extractClientId(req.url);
  if (!clientId) {
    return NextResponse.json(
      { message: "Client ID is missing" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(`${apiURL}/api/clients/${clientId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return await handleApiResponse(response);
  } catch (error) {
    console.error("Failed to delete client:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

// POST Function
export async function POST(req: NextRequest) {
  const session = await getSession();
  const accessToken = session?.accessToken;
  if (!accessToken) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  console.log(req);
  console.log(req.formData);
  console.log(accessToken);
  const body = await req.formData();
  try {
    const response = await fetch(`${apiURL}/api/clients`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: body,
    });
    return await handleApiResponse(response);
  } catch (error) {
    console.error("Failed to create client:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

// PUT Function
export async function PUT(req: NextRequest) {
  const session = await getSession();
  const accessToken = session?.accessToken;
  if (!accessToken) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await req.formData();
  const clientId = extractClientId(req.url);
  if (!clientId) {
    return NextResponse.json(
      { message: "Client ID is missing" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(`${apiURL}/api/clients/${clientId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: body,
    });
    return await handleApiResponse(response);
  } catch (error) {
    console.error("Failed to update client:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export const runtime = "edge";
