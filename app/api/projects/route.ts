import { NextRequest, NextResponse } from "next/server";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const DB_PATH = join(process.cwd(), "data", "projects.json");

function readProjects() {
  try {
    return JSON.parse(readFileSync(DB_PATH, "utf-8"));
  } catch {
    return [];
  }
}

function writeProjects(projects: unknown[]) {
  writeFileSync(DB_PATH, JSON.stringify(projects, null, 2));
}

// GET — جيب كل المشاريع
export async function GET() {
  const projects = readProjects();
  return NextResponse.json(projects);
}

// POST — أضف مشروع جديد
export async function POST(req: NextRequest) {
  const body = await req.json();
  const projects = readProjects();

  const newProject = {
    id: Date.now().toString(),
    title: body.title,
    location: body.location,
    badge: body.badge || "Yeni",
    category: body.category || "pruning",
    before: body.before,
    after: body.after,
    createdAt: new Date().toISOString().split("T")[0],
  };

  projects.unshift(newProject); // أضف في البداية
  writeProjects(projects);

  return NextResponse.json(newProject);
}

// DELETE — احذف مشروع بالـ id
export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  const projects = readProjects();
  const updated = projects.filter((p: { id: string }) => p.id !== id);
  writeProjects(updated);

  return NextResponse.json({ ok: true });
}
