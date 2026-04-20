5.4 Authentication Pages
Signup (src/app/(auth)/signup/page.tsx)
The signup flow must collect: email, password, and role (Founder or Investor). It then creates a
Supabase auth user AND a matching User record in your Prisma database:
&#39;use client&#39;
import { useState } from &#39;react&#39;
import { createClient } from &#39;@/lib/supabase/client&#39;
import { useRouter } from &#39;next/navigation&#39;
export default function SignupPage() {
const [email, setEmail] = useState(&#39;&#39;)
const [password, setPassword] = useState(&#39;&#39;)
const [role, setRole] = useState&lt;&#39;FOUNDER&#39; | &#39;INVESTOR&#39;&gt;(&#39;FOUNDER&#39;)
const [loading, setLoading] = useState(false)
const [error, setError] = useState&lt;string | null&gt;(null)
const router = useRouter()
const supabase = createClient()
async function handleSignup(e: React.FormEvent) {
e.preventDefault()
setLoading(true)
setError(null)
// 1. Create Supabase auth user
const { data: authData, error: authError } = await supabase.auth.signUp({
email, password,
options: { data: { role } } // stored in auth.users metadata
})
if (authError) { setError(authError.message); setLoading(false); return }
// 2. Create User record in our database via API
await fetch(&#39;/api/users&#39;, {
method: &#39;POST&#39;,
body: JSON.stringify({ supabaseId: authData.user!.id, email, role }),
headers: { &#39;Content-Type&#39;: &#39;application/json&#39; }
})
router.push(&#39;/dashboard&#39;)

VENTUREBOARD | Stage 1 Execution Manual | Internal Use Only

ventureboard.io | Connective Equity | Confidential
}
// ... return JSX form ...