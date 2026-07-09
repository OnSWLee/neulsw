import type { NextApiRequest, NextApiResponse } from "next";

type SanityWebhookBody = {
  _type?: string;
  slug?: { current?: string } | string;
};

function getSlug(body: SanityWebhookBody): string | null {
  if (!body.slug) return null;
  if (typeof body.slug === "string") return body.slug;
  return body.slug.current ?? null;
}

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
    const paths = new Set<string>(["/blog", "/reviews"]);

    if (body._type === "blogPost") {
      const slug = getSlug(body);
      if (slug) paths.add(`/blog/${slug}`);
    }

    const revalidated = await Promise.all(
      [...paths].map(async (path) => {
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
