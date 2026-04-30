export default function DashboardBillingPage() {
  return (
    <section className="rounded-[28px] border border-white/10 bg-white/5 p-6">
      <p className="text-xs uppercase tracking-[0.3em] text-white/35">Billing</p>
      <h2 className="mt-3 text-2xl font-semibold text-white">Billing and plan access</h2>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-white/60">
        This section is ready for subscription tiers, receipts, and premium access controls once the
        Stripe layer is added to the dashboard workflow.
      </p>
    </section>
  )
}
