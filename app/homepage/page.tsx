'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { MessageSquare, Sparkles, User, Search, ClipboardList, Users } from 'lucide-react';

type Tab = 'chat' | 'reflection' | 'profile' | 'learning' | 'actions' | 'community';

export default function HomePage() {
  const sp = useSearchParams();
  const router = useRouter();

  const tab = (sp?.get('tab') as Tab) || 'chat';
  const username = sp?.get('username') || 'alice';

  function go(next: Tab) {
    const q = new URLSearchParams(sp?.toString() || '');
    q.set('tab', next);
    q.set('username', username);
    router.push(`/homepage?${q.toString()}`);
  }

  const Iframe = useMemo(() => {
    let src = '/chat';
    if (tab === 'profile') src = `/profile?username=${encodeURIComponent(username)}`;
    if (tab === 'reflection') src = '/reflection';
    if (tab === 'learning') src = '/learning';
    if (tab === 'actions') src = '/actions';
    if (tab === 'community') src = '/community';
    return (
      <iframe
        key={src}
        src={src}
        title={`Ellis-${tab}`}
        style={{ width: '100%', height: '100%', border: 'none' }}
      />
    );
  }, [tab, username]);

  const Btn = (t: Tab, label: string, Icon: React.ComponentType<{ size?: number }>) => (
    <button
      onClick={() => go(t)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        width: '100%',
        textAlign: 'left',
        padding: '12px 16px',
        borderRadius: 12,
        background: tab === t ? '#000' : 'transparent',
        color: tab === t ? '#fff' : '#000',
        fontWeight: 500,
        border: 'none',
        cursor: 'pointer',
        transition: 'all .2s ease',
      }}
    >
      <Icon size={20} />
      <span>{label}</span>
    </button>
  );

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100%', fontFamily: 'Inter, sans-serif', background: '#f6f7f9' }}>
      {/* 左侧导航 */}
      <aside
        style={{
          width: 220,
          borderRight: '1px solid #e5e5e5',
          padding: 20,
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
          background: '#fff',
        }}
      >
        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 6 }}>Ellis</h2>
        <p style={{ fontSize: 14, color: '#666', marginTop: 0 }}>Hi, {username}</p>
        <div style={{ display: 'grid', gap: 8, marginTop: 8 }}>
          {Btn('chat', 'Chat', MessageSquare)}
          {Btn('reflection', 'Reflection', Sparkles)}
          {Btn('actions', 'Actions', ClipboardList)}
          {Btn('community', 'Community', Users)}
          {Btn('learning', 'Learning', Search)}
          {Btn('profile', 'Profile', User)}
        </div>
      </aside>

      {/* 右侧内容区域 */}
      <main style={{ flex: 1, padding: 20 }}>
        <div
          style={{
            height: '100%',
            background: '#fff',
            border: '1px solid #eee',
            borderRadius: 16,
            overflow: 'hidden',
          }}
        >
          {Iframe}
        </div>
      </main>
    </div>
  );
}
