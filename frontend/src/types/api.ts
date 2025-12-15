
export interface User {
  id: string
  email: string
}

export interface Session {
  access_token: string | null
  refresh_token: string | null
}

export interface AuthData {
  user: User
  session: Session
}

export interface SignUpRequest {
  email: string
  password: string
  full_name: string
}

export interface SignInRequest {
  email: string
  password: string
}

export interface AuthResponse {
  status: string
  message: string
  data: AuthData
}

// Video Types
export interface VideoRequest {
  url: string
}

export interface Hook {
  general?: string
  used_in_video?: string
  type?: string
}

export interface VideoAnalysisResponse {
  status: string
  transcript: string
  hook: Hook
  script_base: string
}

export interface VideoAnalysisSaveRequest {
  user_id: string
  video_url: string
  transcript?: string
  hook?: string
  script_base?: string
  video_title?: string
  video_duration?: number
  platform?: string
  metadata?: Record<string, unknown>
}

export interface VideoAnalysisSaveResponse {
  status: string
  message: string
  analysis_id?: string
}

export interface VideoAnalysisListItem {
  id: string
  video_url: string
  video_title?: string | null
  transcript?: string | null
  hook?: string | null
  script_base?: string | null
  platform?: string | null
  created_at: string
  updated_at: string
}

export interface VideoAnalysisListResponse {
  status: string
  data: VideoAnalysisListItem[]
  total: number
}

// Hook Generation Types
export interface HookGenerationRequest {
  idea: string
  nicho?: string
  platform?: string
}

export interface GeneratedHook {
  text: string
  type: string
  retention_score: number
  description?: string
}

export interface HookGenerationResponse {
  status: string
  hooks: GeneratedHook[]
}

export interface ViralHookSaveRequest {
  user_id: string
  idea_input: string
  hook_text: string
  hook_type?: string
  retention_score?: number
  niche?: string
  metadata?: Record<string, unknown>
  notes?: string
}

export interface ViralHookSaveResponse {
  status: string
  message: string
  hook_id?: string
}

export interface ViralHookListItem {
  id: string
  idea_input: string
  hook_text: string
  hook_type?: string
  retention_score?: number
  niche?: string
  notes?: string
  created_at: string
}

export interface ViralHookListResponse {
  status: string
  data: ViralHookListItem[]
  total: number
}

