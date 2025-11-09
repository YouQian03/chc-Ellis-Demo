'use client';

import { useMemo, useState } from 'react';
import { Search as SearchIcon, Bookmark, Clock } from 'lucide-react';

type Mode = 'web' | 'news';

type Resource = {
  id: string;
  title: string;
  author?: string;
  duration?: string;
  episodes?: string;
  badge?: string;          // 右上角小标签
  summary: string;
  cover: string;           // 封面图（可换为本地 /public）
  tags: string[];
  type: 'podcast' | 'article' | 'tool' | 'video';
};

const QUICK = [
  'classroom management',
  'student anxiety',
  'teacher burnout',
  'behavioral interventions',
  'mindfulness',
];

const MOCK: Resource[] = [
  {
    id: 'r1',
    title: 'The Classroom Teacher',
    author: 'Dr. Sarah Johnson',
    duration: '45 min',
    episodes: '128 episodes',
    badge: 'Management',
    summary: 'Evidence-based strategies for creating positive and productive learning environments',
    cover: 'https://images.unsplash.com/photo-1588072432836-e10032774350?w=1200',
    tags: ['classroom management', 'behavior', 'routines'],
    type: 'podcast',
  },
  {
    id: 'r2',
    title: 'Effective Management Strategies',
    author: 'Michael Chen',
    duration: '30 min',
    episodes: '96 episodes',
    badge: 'Behavior',
    summary: 'Practical approaches to behavior management and increasing student engagement',
    cover: 'https://images.unsplash.com/photo-1523246198646-18f4f08ec9b9?w=1200',
    tags: ['engagement', 'behavior', 'classroom management'],
    type: 'podcast',
  },
  {
    id: 'r3',
    title: 'Positive Discipline in Action',
    author: 'Emma Rodriguez',
    duration: '20 min',
    episodes: '215 episodes',
    badge: 'Discipline',
    summary:
      'Build respectful, responsible classrooms through proven positive discipline techniques',
    cover: 'https://images.unsplash.com/photo-1588072432836-9f0b5772c5f0?w=1200',
    tags: ['discipline', 'behavioral interventions'],
    type: 'podcast',
  },
  {
    id: 'r4',
    title: 'Teacher Burnout: Prevention Toolkit',
    author: 'Edutopia',
    summary: 'Practical routines and boundaries that reduce teacher burnout risk.',
    cover: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200',
    tags: ['teacher burnout', 'wellbeing', 'mindfulness'],
    type: 'article',
  },
  {
    id: 'r5',
    title: 'Mindfulness Routines for Busy Classrooms',
    author: 'CASEL',
    summary: '3–5 minute routines to calm transitions and improve focus.',
    cover: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200',
    tags: ['mindfulness', 'classroom management'],
    type: 'video',
  },
];

export default function LearningPage() {
  const [mode, setMode] = useState<Mode>('web');
  const [query, setQuery] = useState('');
  const [trigger, setTrigger] = useState(0); // 点击 Search 的触发器

  // 模拟“搜索执行”——根据 query 文本里的关键词+quick 标签做简单过滤
  const results = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return [];
    const terms = q.split(/\s+/).filter(Boolean);
    return MOCK.filter((r) => {
      const hay =
        `${r.title} ${r.author ?? ''} ${r.summary} ${r.tags.join(' ')}`.toLowerCase();
      return terms.every((t) => hay.includes(t));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger]); // 只有点击 Search 时才刷新，输入不立即触发

  const onQuick = (word: string) => {
    const exists = query.toLowerCase().includes(word.toLowerCase());
    const next = exists ? query : (query ? `${query} ${word}` : word);
    setQuery(next);
  };

  const onSearch = () => setTrigger((n) => n + 1);

  return (
    <main style={{ padding: 24 }}>
      <h1 style={{ fontSize: 40, lineHeight: 1.1, fontWeight: 900, margin: 0 }}>
        Learning Resources
      </h1>
      <p style={{ color: '#6b7280', marginTop: 8, maxWidth: 860 }}>
        Discover evidence-based resources for mental health support, classroom management,
        and student wellbeing from trusted organizations and recent news.
      </p>

      {/* 搜索卡片 */}
      <section
        style={{
          marginTop: 16,
          padding: 18,
          border: '1px solid #eee',
          borderRadius: 16,
          background: '#fff',
        }}
      >
        {/* Search Mode */}
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <span style={{ color: '#6b7280', fontSize: 14 }}>Search Mode:</span>

          <button
            onClick={() => setMode('web')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '8px 12px',
              borderRadius: 10,
              border: '1px solid #eee',
              background: mode === 'web' ? '#111' : '#fff',
              color: mode === 'web' ? '#fff' : '#111',
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            ⚡ Web Resources
          </button>

          <button
            onClick={() => setMode('news')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '8px 12px',
              borderRadius: 10,
              border: '1px solid #eee',
              background: mode === 'news' ? '#111' : '#fff',
              color: mode === 'news' ? '#fff' : '#111',
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            📰 Latest News
          </button>
        </div>

        {/* 搜索框 + 按钮 */}
        <div
          style={{
            marginTop: 12,
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            gap: 10,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '12px 14px',
              border: '1px solid #eee',
              borderRadius: 12,
              background: '#f9fafb',
            }}
          >
            <SearchIcon size={18} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for mental health resources, classroom strategies..."
              style={{
                outline: 'none',
                border: 'none',
                background: 'transparent',
                width: '100%',
              }}
            />
          </div>

          <button
            onClick={onSearch}
            style={{
              padding: '12px 18px',
              borderRadius: 12,
              border: '1px solid #111',
              background: '#111',
              color: '#fff',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Search
          </button>
        </div>

        {/* Quick search */}
        <div style={{ marginTop: 14 }}>
          <div style={{ color: '#6b7280', fontSize: 14, marginBottom: 8 }}>Quick search:</div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {QUICK.map((w) => (
              <button
                key={w}
                onClick={() => onQuick(w)}
                style={{
                  padding: '8px 12px',
                  borderRadius: 999,
                  border: '1px solid #eee',
                  background: '#f6f7f9',
                  cursor: 'pointer',
                }}
              >
                {w}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Saved Learning（占位） */}
      <section
        style={{
          marginTop: 22,
          border: '1px dashed #e5e7eb',
          borderRadius: 16,
          background: '#fff',
          minHeight: 180,
          display: 'grid',
          placeItems: 'center',
          color: '#6b7280',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <Bookmark style={{ margin: '0 auto 8px' }} />
          <div style={{ fontWeight: 600 }}>No saved resources yet</div>
          <div style={{ fontSize: 13, marginTop: 6 }}>
            Search and save resources to build your personalized collection
          </div>
        </div>
      </section>

      {/* 结果区 */}
      <section style={{ marginTop: 28 }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 12 }}>
          {mode === 'web' ? 'Classroom Management Resources' : 'Latest News'}
        </h2>

        {results.length === 0 ? (
          <div style={{ color: '#6b7280' }}>Try searching keywords or click a quick search item.</div>
        ) : (
          <div
            style={{
              display: 'grid',
              gap: 16,
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            }}
          >
            {results.map((r) => (
              <article
                key={r.id}
                style={{
                  overflow: 'hidden',
                  border: '1px solid #eee',
                  borderRadius: 16,
                  background: '#fff',
                }}
              >
                {/* 封面 */}
                <div style={{ position: 'relative', height: 200, overflow: 'hidden' }}>
                  <img
                    src={r.cover}
                    alt={r.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  {r.badge && (
                    <div
                      style={{
                        position: 'absolute',
                        top: 10,
                        right: 10,
                        background: '#111',
                        color: '#fff',
                        padding: '4px 8px',
                        fontSize: 12,
                        borderRadius: 999,
                      }}
                    >
                      {r.badge}
                    </div>
                  )}
                </div>

                {/* 文本信息 */}
                <div style={{ padding: 14 }}>
                  <h3 style={{ margin: 0, fontSize: 18, fontWeight: 800 }}>{r.title}</h3>
                  {r.author && (
                    <div style={{ marginTop: 6, color: '#6b7280', fontSize: 14 }}>by {r.author}</div>
                  )}
                  <p style={{ marginTop: 10, color: '#4b5563' }}>{r.summary}</p>

                  <div
                    style={{
                      marginTop: 8,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      color: '#6b7280',
                      fontSize: 13,
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      {r.duration && (
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                          <Clock size={14} />
                          {r.duration}
                        </span>
                      )}
                    </div>
                    {r.episodes && <span>{r.episodes}</span>}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

