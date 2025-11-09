'use client';

import { useSearchParams } from 'next/navigation';
import { User, Lock, Cog, Database, Brain, Shield, FileText, LogOut, Trash2 } from 'lucide-react';
import { useState, Suspense } from 'react';

function ProfileContent() {
  const sp = useSearchParams();
  const username = sp?.get('username') ?? 'alice';

  const [shareData, setShareData] = useState(true);
  const [enableMemory, setEnableMemory] = useState(true);

  const Card: React.FC<{ title: string; subtitle?: string; children: React.ReactNode }> = ({ title, subtitle, children }) => (
    <section
      style={{
        background: '#fff',
        border: '1px solid #eee',
        borderRadius: 16,
        padding: 20,
      }}
    >
      <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 6 }}>{title}</div>
      {subtitle ? <div style={{ color: '#6b7280', marginBottom: 12 }}>{subtitle}</div> : null}
      <div>{children}</div>
    </section>
  );

  const Row: React.FC<{ icon: React.ReactNode; label: string; value?: React.ReactNode; onClick?: () => void }> = ({
    icon,
    label,
    value,
    onClick,
  }) => (
    <div
      onClick={onClick}
      style={{
        display: 'grid',
        gridTemplateColumns: '28px 1fr auto',
        alignItems: 'center',
        gap: 12,
        padding: '14px 8px',
        cursor: onClick ? 'pointer' : 'default',
        borderBottom: '1px solid #f1f1f1',
      }}
    >
      <div style={{ color: '#374151' }}>{icon}</div>
      <div style={{ color: '#111827' }}>{label}</div>
      <div style={{ color: '#6b7280' }}>{value}</div>
    </div>
  );

  const Toggle: React.FC<{ checked: boolean; onChange: (v: boolean) => void }> = ({ checked, onChange }) => (
    <button
      onClick={() => onChange(!checked)}
      aria-pressed={checked}
      style={{
        width: 44,
        height: 26,
        borderRadius: 999,
        border: '1px solid #e5e7eb',
        background: checked ? '#0f172a' : '#fff',
        position: 'relative',
        transition: 'all .15s ease',
      }}
    >
      <span
        style={{
          position: 'absolute',
          top: 2,
          left: checked ? 22 : 2,
          width: 22,
          height: 22,
          background: '#fff',
          borderRadius: '50%',
          boxShadow: '0 1px 2px rgba(0,0,0,.15)',
          transition: 'left .15s ease',
        }}
      />
    </button>
  );

  return (
    <main style={{ padding: 24, minHeight: '100%', background: '#fafafa' }}>
      <h1 style={{ fontSize: 32, fontWeight: 900, margin: 0 }}>Account</h1>
      <p style={{ color: '#6b7280', marginTop: 6 }}>Manage your Ellis account and preferences</p>

      <div style={{ display: 'grid', gap: 16, marginTop: 16, maxWidth: 980 }}>
        {/* Personal Information */}
        <Card title="Personal Information" subtitle="Your account details">
          <div style={{ display: 'grid', gap: 0 }}>
            <Row
              icon={
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 8,
                    background: '#111827',
                    color: '#fff',
                    display: 'grid',
                    placeItems: 'center',
                    fontWeight: 800,
                  }}
                >
                  A
                </div>
              }
              label="Username"
              value={<span style={{ color: '#111827' }}>{username}</span>}
            />

            <Row icon={<Lock size={18} />} label="Password" value={<span>•••••</span>} />
          </div>
        </Card>

        {/* System Settings */}
        <Card title="System Settings" subtitle="Manage data and memory preferences">
          <div style={{ display: 'grid' }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '28px 1fr auto',
                alignItems: 'center',
                gap: 12,
                padding: '14px 8px',
                borderBottom: '1px solid #f1f1f1',
              }}
            >
              <div style={{ color: '#374151' }}>
                <Database size={18} />
              </div>
              <div>
                <div style={{ color: '#111827' }}>Allow Data Sharing</div>
                <div style={{ color: '#6b7280', fontSize: 12 }}>Share usage data to improve Ellis</div>
              </div>
              <Toggle checked={shareData} onChange={setShareData} />
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '28px 1fr auto',
                alignItems: 'center',
                gap: 12,
                padding: '14px 8px',
              }}
            >
              <div style={{ color: '#374151' }}>
                <Brain size={18} />
              </div>
              <div>
                <div style={{ color: '#111827' }}>Enable Memory Module</div>
                <div style={{ color: '#6b7280', fontSize: 12 }}>Remember context across conversations</div>
              </div>
              <Toggle checked={enableMemory} onChange={setEnableMemory} />
            </div>
          </div>
        </Card>

        {/* Legal & Privacy */}
        <Card title="Legal & Privacy" subtitle="Review our policies and terms">
          <Row icon={<Shield size={18} />} label="Privacy Policy" value={<Chevron />} onClick={() => {}} />
          <Row icon={<FileText size={18} />} label="Terms of Service" value={<Chevron />} onClick={() => {}} />
        </Card>

        {/* Account Actions */}
        <Card title="Account Actions" subtitle="Manage your account status">
          <div style={{ display: 'grid', gap: 10 }}>
            <ActionButton icon={<LogOut size={18} />} label="Log Out" />
            <ActionButton icon={<Trash2 size={18} />} label="Delete Account" danger />
          </div>
        </Card>
      </div>
    </main>
  );
}

export default function ProfilePage() {
  return (
    <Suspense fallback={<div style={{ padding: 24 }}>加载中...</div>}>
      <ProfileContent />
    </Suspense>
  );
}

function Chevron() {
  return (
    <span
      style={{
        display: 'inline-block',
        width: 18,
        textAlign: 'center',
        color: '#9CA3AF',
        transform: 'translateY(1px)',
      }}
    >
      ›
    </span>
  );
}

function ActionButton({ icon, label, danger }: { icon: React.ReactNode; label: string; danger?: boolean }) {
  return (
    <button
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '12px 14px',
        borderRadius: 12,
        border: '1px solid #eee',
        background: '#f9fafb',
        color: danger ? '#b91c1c' : '#111827',
        justifyContent: 'flex-start',
        cursor: 'pointer',
      }}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

