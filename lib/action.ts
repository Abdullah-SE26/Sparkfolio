"use server";

import { auth } from "@/auth";
import { parseServerActionResponse } from "@/lib/utils";
import slugify from "slugify";
import { writeClient } from "@/sanity/lib/write-client";

export const createPitch = async (
  state: any,
  form: FormData
) => {
  const session = await auth();

  if (!session)
    return parseServerActionResponse({
      error: "Not signed in",
      status: "ERROR",
    });

  const { title, description, category, link } = Object.fromEntries(
    Array.from(form).filter(([key]) => key !== "pitch"),
  );

  const slug = slugify(title as string, { lower: true, strict: true });

  try {
    const startup = {
  title,
  description,
  category,
  image: link, // Make sure this is a valid URL string
  slug: {
    _type: "slug",
    current: slug,
  },
  author: {
    _type: "reference",
    _ref: session.id, // Your session user ID
  },
  pitch: {
    _type: "markdown",
    markdown: pitch, // wrap pitch string here
  },
};


    const pitch = form.get("pitch") as string;

    const result = await writeClient.create({ _type: "startup", ...startup });

    return parseServerActionResponse({
      ...result, // contains _id and slug.current
      error: "",
      status: "SUCCESS",
    });
  } catch (error) {
    console.log(error);

    return parseServerActionResponse({
      error: JSON.stringify(error),
      status: "ERROR",
    });
  }
};