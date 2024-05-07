import { auth } from "express-oauth2-jwt-bearer";
import dotenv from "dotenv";
dotenv.config();
const issuerBaseUrl = process.env.AUTH0_ISSUER_BASE_URL;
const audience = process.env.AUTH0_AUDIENCE || "http://localhost:8000/api";

export const jwtCheck = auth({
  audience: audience,
  issuerBaseURL: issuerBaseUrl,
  tokenSigningAlg: "RS256",
});
