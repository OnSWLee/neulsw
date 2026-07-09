import type { NextApiRequest, NextApiResponse } from "next";

type SanityWebhookBody = {
  _type?: string;
  slug?: { current?: string };
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const secret =
    (typeof req.query.secret === "string" ? req.query.secret : null) ||
    (typeof req.headers["x-revalidate-secret"] === "string"
      ? req.headers["x-revalidate-secret"]
      : null);

  if (!process.env.REVALIDATE_SECRET || secret !== process.env.REVALIDATE_SECRET) {
    return res.status(401).json({ message: "Invalid secret" });
  }

  try {
    const body = (req.body ?? {}) as SanityWebhookBody;
    const paths = ["/blog", "/reviews"];

    if (body._type === "blogPost" && body.slug?.current) {
      paths.push(`/blog/${body.slug.current}`);
    }

    const revalidated = await Promise.all(
      paths.map(async (path) => {
        await res.revalidate(path);
        return path;
      })
    );

    return res.status(200).json({
      revalidated: true,
      paths: revalidated,
      now: Date.now(),
    });
  } catch (error) {
    console.error("Revalidation error:", error);
    return res.status(500).json({
      message: "Revalidation failed",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
