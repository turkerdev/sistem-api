import { nanoid } from "nanoid";
import { prisma } from "../../../prisma.js";
import { APIError } from "../../../utils/apierror.js";

interface createParams {
  target: string;
  createdBy: string;
}

export const create = async ({ target, createdBy }: createParams) => {
  const SHORT_LENGTH = 4;
  const short = nanoid(SHORT_LENGTH);
  const now = new Date();
  const nextMonth = new Date(now).setMonth(now.getMonth() + 1);

  // Check if aka with same short and didnt expire exist
  const existAka = await prisma.aka.findFirst({
    where: {
      short,
      validUntil: {
        gte: now,
      },
    },
  });

  if (existAka) {
    throw new APIError(400, {
      path: "short",
      messages: ["This short is already exist"],
    });
  }

  const aka = await prisma.aka.create({
    data: {
      short,
      target,
      createdBy,
      validUntil: new Date(nextMonth),
    },
  });

  return aka.short;
};

interface getParams {
  short: string;
  clickedBy: string;
}

export const get = async ({ short, clickedBy }: getParams) => {
  const now = new Date();

  // Find the short that didnt expire
  const aka = await prisma.aka.findFirst({
    where: {
      short,
      validUntil: {
        gte: now,
      },
    },
  });

  if (!aka) {
    return null;
  }

  // Log click
  await prisma.akaDetails.create({
    data: {
      AkaId: aka.id,
      clickedBy,
    },
  });

  return aka.target;
};
