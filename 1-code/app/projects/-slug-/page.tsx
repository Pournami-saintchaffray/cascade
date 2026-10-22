import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { PROJECTS, getProject } from '@/lib/projects';
import { ProjectGallery } from '@/components/ProjectGallery';

export function generateStaticParams() { return PROJECTS.map((p) => ({ slug: p.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = getProject((await params).slug);
  return { title: p ? `${p.name} — CASCADE` : 'CASCADE' };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const project = getProject((await params).slug);
  if (!project) notFound();
  return <ProjectGallery project={project} />;
}
