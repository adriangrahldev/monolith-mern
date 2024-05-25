import { NextRequest, NextResponse } from "next/server";
const apiURL = process.env.API_SERVER_URL;

export async function GET(req: NextRequest) {
  if (req.url.includes("projectId")) {
    const projectId = req.url.split("=")[1];
    try {
      const response = await fetch(`${apiURL}/api/projects/view/${projectId}`, {
        cache: "no-store", //desactiva el cache ya que no se actualiza el detalle del proyecto
      });
      console.log(response.url);
      return NextResponse.json(await response.json());
    } catch (error) {
      console.error("Failed to fetch project:", error);
      return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
  } else {
    return NextResponse.json({ message: "Invalid request" }, { status: 400 });
  }
}
