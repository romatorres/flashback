import { prisma } from "@/lib/prisma";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { admin, customSession } from "better-auth/plugins";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
    autoSignIn: false,
  },
  plugins: [
    admin({
      defaultRole: "USER",
      adminRoles: ["ADMIN"],
    }),
    customSession(async ({ user }) => {
      if (user) {
        const dbUser = await prisma.user.findUnique({
          where: { id: user.id },
          select: { role: true },
        });

        return {
          user: {
            ...user,
            role: dbUser?.role || "USER",
          },
        };
      }
      return {};
    }),
  ],
});

export type Session = typeof auth.$Infer.Session;
