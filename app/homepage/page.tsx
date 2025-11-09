'use client';

import { useState } from 'react';
import { MessageSquare, Sparkles, User, Search } from 'lucide-react';

type Tab = 'chat' | 'reflection' | 'profile' | 'learning';

export default function HomePage() {
  const [current, setCurrent] = useState<Tab>('chat');

  const Btn = (
    tab: Tab,
    label: string,
    Icon: React.ComponentType<{ size?: number }>
  ) => (
    <button
      key={tab}
      onClick={() => setCurrent(tab)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        width: '100%',
        textAlign: 'left',
        padding: '12px 16px',
        borderRadius: 12,
        background: current === tab ? '#000' : 'transparent',
        color: current === tab ? '#fff' : '#000',
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

  const Content = () => {
    if (current === 'chat') {
      // 保持你原来的 Chat UI：直接嵌入现有 /chat 页面
      return (
        <iframe
          src="/chat"
          title="Ellis Chat"
          style={{ width: '100%', height: '100%', border: 'none' }}
        />
      );
    }
    if (current === 'reflection') {
      return (
        <Placeholder
          title="Reflection"
          desc="这里放你的 Reflection 模块（先占位）。后续可替换为你自己的组件，或改成 <iframe src='/reflection'/>。"
        />
      );
    }
    if (current === 'profile') {
      return (
        <Placeholder
          title="Profile"
          desc="这里放用户信息/设置（先占位）。后续可替换为你自己的组件，或改成 <iframe src='/profile'/>。"
        />
      );
    }
    // learning
    return (
      <Placeholder
        title="Learning"
        desc="这里放学习资源（先占位）。后续可替换为你自己的组件，或改成 <iframe src='/learning'/>。"
      />
    );
  };

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100%', fontFamily: 'Inter, sans-serif' }}>
      {/* 左侧导航 */}
      <aside
        style={{
          width: 220,
          borderRight: '1px solid #e5e5e5',
          padding: 20,
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
        }}
      >
        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 6 }}>Ellis</h2>
        <p style={{ fontSize: 14, color: '#666', marginTop: 0 }}>Hi, alice</p>

        <div style={{ display: 'grid', gap: 8, marginTop: 8 }}>
          {Btn('chat', 'Chat', MessageSquare)}
          {Btn('reflection', 'Reflection', Sparkles)}
          {Btn('profile', 'Profile', User)}
          {Btn('learning', 'Learning', Search)}
        </div>
      </aside>

      {/* 右侧内容区 */}
      <main style={{ flex: 1, background: '#fafafa', padding: 20 }}>
        <div
          style={{
            height: '100%',
            background: '#fff',
            border: '1px solid #eee',
            borderRadius: 16,
            overflow: 'hidden',
          }}
        >
          <Content />
        </div>
      </main>
    </div>
  );
}

function Placeholder({ title, desc }: { title: string; desc: string }) {
  return (
    <div style={{ padding: 24 }}>
      <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{title}</div>
      <div style={{ color: '#666' }}>{desc}</div>
    </div>
  );
}








