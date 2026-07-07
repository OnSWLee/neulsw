import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export interface StoredUser {
  id: string;
  username: string;
  password: string;
  name: string;
  birthDate: string;
  isAdmin?: boolean;
}

export interface PublicUser {
  id: string;
  username: string;
  name: string;
  birthDate: string;
  isAdmin?: boolean;
}

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production";

const globalForUsers = globalThis as typeof globalThis & {
  __neulswUsers?: StoredUser[];
};

function getUsers(): StoredUser[] {
  if (!globalForUsers.__neulswUsers) {
    globalForUsers.__neulswUsers = [];
  }
  return globalForUsers.__neulswUsers;
}

export async function ensureAdminUser(): Promise<void> {
  const username = process.env.ADMIN_USERNAME || "admin";
  const password = process.env.ADMIN_PASSWORD || "admin123";
  const hashedPassword = await bcrypt.hash(password, 10);
  const users = getUsers();

  const existing = users.find((user) => user.username === username);
  if (!existing) {
    users.push({
      id: "admin-1",
      username,
      password: hashedPassword,
      name: "관리자",
      birthDate: "1990-01-01",
      isAdmin: true,
    });
    return;
  }

  existing.password = hashedPassword;
  existing.isAdmin = true;
}

export function toPublicUser(user: StoredUser): PublicUser {
  return {
    id: user.id,
    username: user.username,
    name: user.name,
    birthDate: user.birthDate,
    isAdmin: user.isAdmin || false,
  };
}

export function createToken(user: StoredUser): string {
  return jwt.sign({ userId: user.id, username: user.username }, JWT_SECRET, {
    expiresIn: "7d",
  });
}

export async function loginUser(
  username: string,
  password: string
): Promise<{ token: string; user: PublicUser } | null> {
  await ensureAdminUser();
  const user = getUsers().find((entry) => entry.username === username);
  if (!user) return null;

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return null;

  return {
    token: createToken(user),
    user: toPublicUser(user),
  };
}

export async function registerUser(input: {
  username: string;
  password: string;
  name: string;
  birthDate: string;
}): Promise<{ token: string; user: PublicUser } | { error: string }> {
  await ensureAdminUser();
  const users = getUsers();

  if (users.some((user) => user.username === input.username)) {
    return { error: "이미 사용 중인 아이디입니다." };
  }

  const hashedPassword = await bcrypt.hash(input.password, 10);
  const newUser: StoredUser = {
    id: Date.now().toString(),
    username: input.username,
    password: hashedPassword,
    name: input.name,
    birthDate: input.birthDate,
  };

  users.push(newUser);

  return {
    token: createToken(newUser),
    user: toPublicUser(newUser),
  };
}
