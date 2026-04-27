'use client'

import { useState } from 'react'

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<'FOUNDER' | 'INVESTOR'>('FOUNDER')

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form className="flex flex-col gap-3">
        <input
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          placeholder="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <select value={role} onChange={(e) => setRole(e.target.value as 'FOUNDER' | 'INVESTOR')}>
          <option value="FOUNDER">Founder</option>
          <option value="INVESTOR">Investor</option>
        </select>

        <button type="button">
          Sign up
        </button>
      </form>
    </div>
  )
}