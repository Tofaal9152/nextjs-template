export async function proxy() {}

// demo proxy
// import { NextRequest, NextResponse } from "next/server";
// import { getSession } from "./utils/session";

// export async function proxy(req: NextRequest) {
//   const session = await getSession();
//   const { pathname } = req.nextUrl;

//   // ❌ Not logged in → block protected pages
//   if (!session && pathname.startsWith("/khar-academy/my-bookings")) {
//     return NextResponse.redirect(new URL("/auth/signin", req.url));
//   }

//   // ✅ Logged in → prevent access to auth pages
//   if (session && pathname.startsWith("/auth")) {
//     return NextResponse.redirect(new URL("/", req.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/auth/:path*", "/khar-academy/my-bookings/:path*"],
// };
