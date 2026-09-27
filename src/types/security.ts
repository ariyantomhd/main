// src/types/security.ts
import {
  ModuleKey,
  ThreatType,
  ThreatSeverity,
  SecurityAction,
  SystemStatus,
  IPBlockReason,
  IPReputation,
  SessionStatus,
  SecurityAlertStatus,
  AuditAction,
} from './enum';

export interface SystemSwitchConfig {
  id: string;
  module_key: ModuleKey;
  is_online: boolean;
  status: SystemStatus;
  maintenance_message: string | null;
  updated_by: string;
  updated_at: string;
}

export interface SecurityPayloadSnapshot {
  sanitized: boolean;
  detected_fields: string[];
  payload_hash: string | null;
  preview: string | null;
}

export interface SecurityLogItem {
  id: string;
  user_id: string | null;
  session_id: string | null;
  ip_address: string;
  user_agent: string | null;
  device_fingerprint: string | null;
  method: string;
  endpoint: string;
  module_key: ModuleKey;
  threat_type: ThreatType;
  severity: ThreatSeverity;
  payload_snapshot: SecurityPayloadSnapshot;
  action_taken: SecurityAction;
  request_id: string;
  created_at: string;
}

export interface IPBlacklistRecord {
  id: string;
  ip_address: string;
  reputation: IPReputation;
  reason: IPBlockReason;
  notes?: string;
  blocked_by: string;
  is_active: boolean;
  expires_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface UserSessionItem {
  id: string;
  user_id: string;
  ip_address: string;
  user_agent: string | null;
  device_fingerprint: string | null;
  location_country: string | null;
  location_region: string | null;
  status: SessionStatus;
  last_activity_at: string;
  expires_at: string;
  created_at: string;
}

export interface SecurityAlertItem {
  id: string;
  title: string;
  description: string;
  threat_type: ThreatType;
  severity: ThreatSeverity;
  source_ip: string | null;
  user_id: string | null;
  session_id: string | null;
  status: SecurityAlertStatus;
  assigned_to: string | null;
  resolved_by: string | null;
  resolved_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface AdminAuditLogItem {
  id: string;
  admin_id: string;
  action: AuditAction;
  target_type: string;
  target_id: string | null;
  previous_value: Record<string, unknown> | null;
  new_value: Record<string, unknown> | null;
  ip_address: string | null;
  created_at: string;
}