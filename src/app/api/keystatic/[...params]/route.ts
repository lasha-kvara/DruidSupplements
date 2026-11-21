import { makeRouteHandler } from "@keystatic/next/route-handler";
import config, { keystaticEnabled } from "../../../../../keystatic.config";

const disabled = () => new Response("Not found", { status: 404 });

// Without a GitHub App in production the admin API is switched off entirely.
export const { POST, GET } = keystaticEnabled ? makeRouteHandler({ config }) : { POST: disabled, GET: disabled };
