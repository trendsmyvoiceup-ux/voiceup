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

export type DbApproval = {
  status: "approved" | "rejected" | "needs_changes";
  note: string | null;
  approvedBy: string | null;
  approvedAt: string | null;
  publishedBy: string | null;
  publishedAt: string | null;
  republishedAt: string | null;
  publishedWebsiteAt: string | null;
  updatedAt: string;
} | null;

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
  hasTikTokImage: boolean;
  hasPublishedPackage: boolean;
  tiktok: TikTokContent | null;
  battleCaption: string | null;
  battleHashtags: string | null;
  battleScript: string | null;
  pipeline: PipelineStatus;
  dbApproval: DbApproval; // null until fetched from DB
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

export type StudioStats = {
  total: number;
  reviewed: number;
  approved: number;
  rejected: number;
  withTikTok: number;
  withPublished: number;
  avgScore: number | null;
};
