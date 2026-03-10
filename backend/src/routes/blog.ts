import express from "express";
import { authenticateToken, AuthRequest } from "../middleware/auth";
import { requireAdmin } from "../middleware/admin";
import { client } from "../lib/sanity";

const router = express.Router();

// 모든 블로그 포스트 조회 (공개) - Sanity에서 가져오기
router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 8;
    const start = (page - 1) * limit;
    const end = start + limit;

    const query = `*[_type == "blogPost" && postType == "blog"] | order(publishedAt desc) [${start}...${end}] {
      _id,
      title,
      excerpt,
      "content": content[].children[].text,
      author,
      "date": publishedAt,
      "image": mainImage.asset->url,
      "createdAt": _createdAt,
      "updatedAt": _updatedAt,
      slug
    }`;

    const countQuery = `count(*[_type == "blogPost" && postType == "blog"])`;

    const [posts, total] = await Promise.all([
      client.fetch(query),
      client.fetch(countQuery),
    ]);

    // Sanity 데이터를 기존 API 형식으로 변환
    const formattedPosts = posts.map((post: any) => ({
      id: post._id,
      title: post.title,
      excerpt: post.excerpt,
      content: Array.isArray(post.content) ? post.content.join(' ') : post.content || '',
      author: post.author,
      date: post.date ? new Date(post.date).toISOString().split("T")[0] : new Date().toISOString().split("T")[0],
      image: post.image || "/images/blog/default.jpg",
      createdAt: post.createdAt || new Date().toISOString(),
      updatedAt: post.updatedAt || new Date().toISOString(),
      slug: post.slug
    }));

    const totalPages = Math.ceil(total / limit);

    res.json({
      posts: formattedPosts,
      pagination: {
        currentPage: page,
        totalPages,
        totalPosts: total,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    });
  } catch (error) {
    console.error("블로그 포스트 조회 오류:", error);
    res.status(500).json({
      error: "블로그 포스트를 불러오는데 실패했습니다."
    });
  }
});

// 특정 블로그 포스트 조회 (공개) - Sanity에서 가져오기
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    
    // Sanity _id로 조회
    const query = `*[_type == "blogPost" && _id == $id][0] {
      _id,
      title,
      excerpt,
      "content": content[].children[].text,
      author,
      "date": publishedAt,
      "image": mainImage.asset->url,
      "createdAt": _createdAt,
      "updatedAt": _updatedAt,
      slug
    }`;

    const post = await client.fetch(query, { id });

    if (!post) {
      return res.status(404).json({ error: "블로그 포스트를 찾을 수 없습니다." });
    }

    // Sanity 데이터를 기존 API 형식으로 변환
    const formattedPost = {
      id: post._id,
      title: post.title,
      excerpt: post.excerpt,
      content: Array.isArray(post.content) ? post.content.join(' ') : post.content || '',
      author: post.author,
      date: post.date ? new Date(post.date).toISOString().split("T")[0] : new Date().toISOString().split("T")[0],
      image: post.image || "/images/blog/default.jpg",
      createdAt: post.createdAt || new Date().toISOString(),
      updatedAt: post.updatedAt || new Date().toISOString(),
      slug: post.slug
    };

    res.json(formattedPost);
  } catch (error) {
    console.error("블로그 포스트 조회 오류:", error);
    res.status(500).json({
      error: "블로그 포스트를 불러오는데 실패했습니다."
    });
  }
});

// 블로그 포스트 생성/수정/삭제는 Sanity Studio에서 직접 관리
// 백엔드 API는 읽기 전용으로 Sanity에서 데이터를 가져옴

export { router };


