import { prisma } from "../prisma/client.js";

export const search = async (req, res, next) => {
  try {
    const userId = req.userId;
    const q = String(req.query.q || "").trim();

    if (!q || q.length < 2) {
      return res.json({ teams: [], projects: [], tasks: [] });
    }

    // Teams where user is a member
    const memberTeamIds = (await prisma.teamMember.findMany({
      where: { userId },
      select: { teamId: true },
    })).map(m => m.teamId);

    const [teams, projects, tasks] = await Promise.all([
      prisma.team.findMany({
        where: {
          id: { in: memberTeamIds },
          name: { contains: q, mode: "insensitive" },
        },
        select: { id: true, name: true, description: true },
        take: 5,
      }),

      prisma.project.findMany({
        where: {
          teamId: { in: memberTeamIds },
          OR: [
            { name:        { contains: q, mode: "insensitive" } },
            { description: { contains: q, mode: "insensitive" } },
          ],
        },
        select: { id: true, name: true, description: true, status: true, teamId: true },
        take: 8,
      }),

      prisma.task.findMany({
        where: {
          project: { teamId: { in: memberTeamIds } },
          OR: [
            { title:       { contains: q, mode: "insensitive" } },
            { description: { contains: q, mode: "insensitive" } },
          ],
        },
        select: { id: true, title: true, status: true, priority: true, projectId: true },
        take: 12,
      }),
    ]);

    res.json({ teams, projects, tasks });
  } catch (err) {
    next(err);
  }
};
