# Reference Materials

Case studies, blueprints, and architectural reference materials for Ai.Rio.

## Documents

| Document | Description | Last Updated |
|----------|-------------|--------------|
| [Case Study: Margin Corrected](case-study-margin-corrected.md) | LLM cost tracking implementation case study | Feb 9, 2025 |
| [Case Study: Metering Service](case-study-metering-service.md) | Stripe Meter billing implementation | Feb 9, 2025 |
| [Case Study: QuoteKit](case-study-quotekit.md) | Failed payment recovery implementation | Feb 9, 2025 |
| [Refined Portfolio Blueprint](refined-portfolio-blueprint.md) | Service offering blueprint and positioning | Feb 9, 2025 |

---

## Case Studies

### Margin (LLM Cost Tracking)
- **Problem**: AI SaaS couldn't attribute LLM costs to customers
- **Solution**: Multi-provider cost tracking with customer attribution
- **Outcome**: Visibility into per-customer margins, optimization roadmap

### Metering Service (Stripe Billing)
- **Problem**: SaaS company needed usage-based pricing
- **Solution**: Stripe Meter implementation with event streaming
- **Outcome**: 54% faster revenue growth through UBP

### QuoteKit (Failed Payment Recovery)
- **Problem**: 47.6% median payment recovery rate
- **Solution**: Dunning workflow with exponential backoff
- **Outcome**: Improved recovery to 65-70% top-performer levels

---

## Service Blueprint

The [Refined Portfolio Blueprint](refined-portfolio-blueprint.md) documents:
- Three income streams strategy
- Service packaging and pricing
- ICP definition and messaging
- Delivery processes and timelines

---

## Architecture Reference

Key architectural patterns from case studies:
- **Idempotency keys** for billing events
- **Webhook signature verification** (HMAC-SHA256)
- **Edge case handling** (720-line coordinator)
- **Production testing** (99.5% test pass rate)

---

**For implementation guides, see [Guides](../guides/README.md).**
