import { prisma } from "../prisma/client.js";

const toSafeUser = (user) => ({
  id: user.id,
  email: user.email,
  username: user.username,
  fullName: user.fullName,
  avatarUrl: user.avatarUrl || null,
  bio: user.bio || null,
  isEmailVerified: Boolean(user.isEmailVerified),
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
  lastLoginAt: user.lastLoginAt || null,
  teamIds: Array.isArray(user.teamMemberships)
    ? user.teamMemberships.map((membership) => membership.teamId)
    : [],
});

export const getMyProfile = async (req, res, next) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        teamMemberships: {
          select: { teamId: true },
        },
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json({ user: toSafeUser(user) });
  } catch (error) {
    return next(error);
  }
};

export const updateMyProfile = async (req, res, next) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const { fullName, username, bio, avatarUrl } = req.body || {};
    const updates = {};

    if (typeof fullName === "string") {
      const normalizedFullName = fullName.trim();
      if (!normalizedFullName) {
        return res.status(400).json({ message: "Full name cannot be empty" });
      }
      updates.fullName = normalizedFullName;
    }

    if (typeof username === "string") {
      const normalizedUsername = username.trim().toLowerCase();
      if (!normalizedUsername) {
        return res.status(400).json({ message: "Username cannot be empty" });
      }

      const existingUser = await prisma.user.findFirst({
        where: {
          username: normalizedUsername,
          NOT: { id: userId },
        },
        select: { id: true },
      });

      if (existingUser) {
        return res.status(409).json({ message: "Username already in use" });
      }

      updates.username = normalizedUsername;
    }

    if (typeof bio === "string") {
      updates.bio = bio.trim();
    }

    if (typeof avatarUrl === "string") {
      updates.avatarUrl = avatarUrl.trim() || null;
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ message: "No profile changes provided" });
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updates,
      include: {
        teamMemberships: {
          select: { teamId: true },
        },
      },
    });

    return res.json({
      message: "Profile updated successfully",
      user: toSafeUser(updatedUser),
    });
  } catch (error) {
    return next(error);
  }
};
