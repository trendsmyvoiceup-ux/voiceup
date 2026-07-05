export type PipelineAgentStatus = {
  status: string;
  updatedAt: string;
} | null;

export type PipelineStatus = {
  reviewer:  PipelineAgentStatus;
  website:   PipelineAgentStatus;
  publisher: PipelineAgentStatus;
};

export type TikTokContent = {
  caption: string | null;
  script: string | null;
  hashtags: string | null;
  videoPrompt: string | null;
  imagePrompt: string | null;
  battleLink: string | null;
  postingChecklist: string | null;
};

export type StudioBattle = {
  slug: string;
  title: string;
  subjectA: string;
  subjectB: string;
  category: string;
  reviewScore: number | null;
  reviewApproved: boolean | null;
  reviewedAt: string | null;
  hasTikTokPackage: boolean;
  hasPublishedPackage: boolean;
  tiktok: TikTokContent | null;
  battleCaption: string | null;
  battleHashtags: string | null;
  battleScript: string | null;
  pipeline: PipelineStatus;
};

export type StudioStatus =
  | "draft"
  | "generated"
  | "needs_review"
  | "approved"
  | "rejected"
  | "publish_ready"
  | "published_placeholder";

export type StudioEntry = {
  status: StudioStatus;
  updatedAt: string;
  publishedAt?: string;
};

export type StudioStore = Record<string, StudioEntry>;
