import { useState } from 'react';

// 선택 가능한 대표 캐릭터
const AVATARS = ['🐶', '🐱', '🐰', '🐹', '🐕', '🐈', '🐩', '🐇'];

export default function ProfileCard({ profile, onSave, onClear }) {
  const [editing, setEditing] = useState(!profile);
  const [name, setName] = useState(profile?.name ?? '');
  const [avatar, setAvatar] = useState(profile?.avatar ?? AVATARS[0]);

  function handleSave() {
    if (!name.trim()) return;
    onSave({ name: name.trim().slice(0, 20), avatar });
    setEditing(false);
  }

  // 저장된 프로필 표시 모드
  if (profile && !editing) {
    return (
      <div className="flex items-center justify-between rounded-2xl border border-brand-100 bg-gradient-to-r from-brand-50 to-white p-4">
        <div className="flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-full bg-white text-2xl shadow-sm ring-1 ring-brand-100">
            {profile.avatar}
          </div>
          <div>
            <p className="text-[11px] font-semibold text-brand-500">나의 반려동물</p>
            <p className="text-lg font-bold text-stone-900">{profile.name}</p>
          </div>
        </div>
        <button
          onClick={() => setEditing(true)}
          className="rounded-lg px-3 py-1.5 text-xs font-semibold text-stone-500 hover:bg-white"
        >
          수정
        </button>
      </div>
    );
  }

  // 프로필 설정 모드
  return (
    <div className="rounded-2xl border border-stone-100 bg-white p-5 shadow-sm">
      <p className="text-sm font-bold text-stone-800">🐾 나의 반려동물 프로필 만들기</p>
      <p className="mt-1 text-xs text-stone-400">
        대표 캐릭터와 이름을 정해두면 결과에 프로필 카드로 표시돼요.
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {AVATARS.map((a) => (
          <button
            key={a}
            type="button"
            onClick={() => setAvatar(a)}
            className={`grid h-11 w-11 place-items-center rounded-xl border-2 text-xl transition ${
              avatar === a ? 'border-brand-500 bg-brand-50' : 'border-stone-200 hover:border-stone-300'
            }`}
          >
            {a}
          </button>
        ))}
      </div>

      <div className="mt-4 flex gap-2">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSave()}
          placeholder="이름 (예: 콩이)"
          className="flex-1 rounded-xl border border-stone-200 px-4 py-2.5 outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-100"
        />
        <button
          onClick={handleSave}
          disabled={!name.trim()}
          className="rounded-xl bg-brand-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-600 disabled:opacity-50"
        >
          저장
        </button>
        {profile && (
          <button
            onClick={() => {
              onClear();
              setEditing(false);
            }}
            className="rounded-xl border border-stone-200 px-4 py-2.5 text-sm font-semibold text-stone-500 hover:bg-stone-50"
          >
            삭제
          </button>
        )}
      </div>
    </div>
  );
}
