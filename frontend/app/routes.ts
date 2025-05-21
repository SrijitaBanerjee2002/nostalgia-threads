import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/aboutRoute.tsx"),
    route("feed", "routes/homeRoute.tsx"),
] satisfies RouteConfig;
