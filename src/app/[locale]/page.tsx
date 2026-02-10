import { getTranslations } from 'next-intl/server';
import { Navbar } from '@/components/navbar';
import { generatePageMetadata } from '@/lib/metadata/page-metadata';
import { TechnicalProof } from '@/components/service-sections/technical-proof';
import { DashboardShowcase } from '@/components/service-sections/dashboard-showcase';
import { DeliverablesSection } from '@/components/service-sections/deliverables-section';
import { ProblemSection } from '@/components/service-sections/problem-section';
import { SimplifiedContactForm } from '@/components/simplified-contact-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, CheckCircle2, TrendingUp, Zap, Shield, Database, Code2, DollarSign } from 'lucide-react';
import Link from 'next/link';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return generatePageMetadata({
    locale: locale as any,
    namespace: 'home',
    path: '/',
  });
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return (
    <div className="min-h-screen bg-zinc-950 dark:bg-black text-zinc-50 dark:text-zinc-400">
      <Navbar locale={locale} />

      {/* Commit 21: Enhanced Hero Section */}
      <section className="relative px-6 py-24 lg:px-8 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/20 via-transparent to-transparent" />
        <div className="mx-auto max-w-4xl relative">
          <div className="text-center space-y-8">
            {/* Main headline */}
            <div className="space-y-4">
              <Badge variant="secondary" className="mb-4">
                <Zap className="h-3 w-3 mr-1" />
                {locale === 'en' ? 'AI Cost Visibility Platform' : 'Plataforma de Visibilidade de Custos de IA'}
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
                {locale === 'en'
                  ? "Your AI margins are a black box."
                  : "Suas margens de IA são uma caixa preta."}
              </h1>
              <h2 className="text-3xl font-bold tracking-tight text-indigo-400 sm:text-5xl">
                {locale === 'en' ? "I built a flashlight." : "Eu construí uma lanterna."}
              </h2>
            </div>

            {/* Subheadline */}
            <p className="mt-6 text-lg leading-8 text-zinc-300 sm:text-xl max-w-3xl mx-auto">
              {locale === 'en'
                ? "Stop flying blind on LLM costs. Get real-time visibility into your AI infrastructure, track every token across providers, and know your true margins down to the cent."
                : "Pare de voar às cegas nos custos de LLM. Obtenha visibilidade em tempo real da sua infraestrutura de IA, rastreie cada token entre provedores e conheça suas margens verdadeiras até o centavo."}
            </p>

            {/* CTAs */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="group gap-2 bg-indigo-600 hover:bg-indigo-500 text-white"
              >
                <a href="#infrastructure">
                  {locale === 'en' ? 'See the Infrastructure' : 'Ver a Infraestrutura'}
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-zinc-700 bg-zinc-900 text-white hover:bg-zinc-800"
              >
                <a href="#contact">
                  {locale === 'en' ? 'Book a Discovery Call' : 'Agendar uma Chamada de Descoberta'}
                </a>
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="pt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-zinc-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span>{locale === 'en' ? 'Production-ready' : 'Pronto para produção'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-blue-500" />
                <span>{locale === 'en' ? 'SOC 2 Compliant' : 'Conforme SOC 2'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Database className="h-4 w-4 text-purple-500" />
                <span>{locale === 'en' ? '5 Providers Supported' : '5 Provedores Suportados'}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Commit 21: Technical Proof Section */}
      <section id="infrastructure" className="px-6 py-24 lg:px-8 bg-zinc-900/30">
        <div className="mx-auto max-w-6xl">
          <TechnicalProof
            locale={locale}
            title={locale === 'en' ? 'Production-Grade Infrastructure' : 'Infraestrutura de Nível de Produção'}
            subtitle={locale === 'en' ? 'Real metrics from the actual codebase' : 'Métricas reais do código real'}
            metrics={[
              {
                id: 'coverage',
                label: locale === 'en' ? 'Test Coverage' : 'Cobertura de Testes',
                value: 99.5,
                suffix: '%',
                description: locale === 'en' ? 'Comprehensive test suite' : 'Suite de testes abrangente',
                progress: 99.5,
                trend: 'up'
              },
              {
                id: 'providers',
                label: locale === 'en' ? 'Providers Supported' : 'Provedores Suportados',
                value: 5,
                description: locale === 'en' ? 'OpenAI, Anthropic, OpenRouter, Groq, Mistral' : 'OpenAI, Anthropic, OpenRouter, Groq, Mistral',
                progress: 100,
                trend: 'up'
              },
              {
                id: 'policies',
                label: locale === 'en' ? 'RLS Policies' : 'Políticas RLS',
                value: 45,
                description: locale === 'en' ? 'Row-level security policies' : 'Políticas de segurança em nível de linha',
                progress: 100,
                trend: 'up'
              },
              {
                id: 'models',
                label: locale === 'en' ? 'Models Tracked' : 'Modelos Rastreados',
                value: 400,
                suffix: '+',
                description: locale === 'en' ? 'Across all providers' : 'Em todos os provedores',
                progress: 95,
                trend: 'up'
              }
            ]}
            highlightedMetric="coverage"
            layout="grid"
          />
        </div>
      </section>

      {/* Commit 21: Dashboard Screenshot Showcase */}
      <section className="px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <DashboardShowcase
            locale={locale}
            title={locale === 'en' ? 'See Your Costs in Real-Time' : 'Veja Seus Custos em Tempo Real'}
            subtitle={locale === 'en'
              ? 'Monitor your LLM spending across all providers with a single dashboard. Track costs per customer, per feature, per token.'
              : 'Monitore seus gastos com LLM em todos os provedores com um único painel. Rastreie custos por cliente, por recurso, por token.'}
            views={[
              {
                id: 'dashboard',
                title: locale === 'en' ? 'AI Cost Dashboard' : 'Painel de Custos de IA',
                description: locale === 'en'
                  ? 'Real-time cost tracking with breakdown by provider and model'
                  : 'Rastreamento de custos em tempo real com detalhamento por provedor e modelo',
                imageSrc: '/dashboard-screenshot.png',
                imageAlt: locale === 'en'
                  ? 'AI.RIO dashboard showing LLM cost breakdown by provider and model'
                  : 'Painel AI.RIO mostrando detalhamento de custos LLM por provedor e modelo',
                device: 'desktop',
                badge: locale === 'en' ? 'Live Demo' : 'Demo ao Vivo'
              }
            ]}
            cta={{
              label: locale === 'en' ? 'View Live Demo' : 'Ver Demo ao Vivo',
              href: locale === 'en' ? 'https://demo.ai-rio.com' : 'https://demo.ai-rio.com',
              external: true
            }}
            aspectRatio="16/9"
          />
        </div>
      </section>

      {/* Commit 22: Problem Section */}
      <section className="px-6 py-24 lg:px-8 bg-zinc-900/30">
        <div className="mx-auto max-w-6xl">
          <ProblemSection
            title={locale === 'en' ? 'The AI Cost Black Box Problem' : 'O Problema da Caixa Preta dos Custos de IA'}
            subtitle={locale === 'en'
              ? 'Most AI SaaS companies are losing money because they can\'t see their true margins'
              : 'A maioria das empresas de IA SaaS está perdendo dinheiro porque não consegue ver suas margens verdadeiras'}
            problems={[
              {
                id: 'no-visibility',
                title: locale === 'en' ? 'No Cost Visibility' : 'Sem Visibilidade de Custos',
                description: locale === 'en'
                  ? 'AI costs are scattered across multiple provider dashboards, making it impossible to track total spend or attribute costs to specific customers.'
                  : 'Os custos de IA estão espalhados por vários painéis de provedores, tornando impossível rastrear o gasto total ou atribuir custos a clientes específicos.',
                severity: 'critical',
                metric: locale === 'en' ? '87% of AI SaaS companies' : '87% das empresas de IA SaaS'
              },
              {
                id: 'unknown-margins',
                title: locale === 'en' ? 'Unknown True Margins' : 'Margens Verdadeiras Desconhecidas',
                description: locale === 'en'
                  ? 'Without per-customer cost tracking, you\'re flying blind on profitability. Some customers could be costing more than they pay.'
                  : 'Sem rastreamento de custos por cliente, você está voando às cegas sobre a rentabilidade. Alguns clientes podem custar mais do que pagam.',
                severity: 'critical'
              },
              {
                id: 'usage-spikes',
                title: locale === 'en' ? 'Unexpected Usage Spikes' : 'Picos de Uso Inesperados',
                description: locale === 'en'
                  ? 'A single heavy user can spike your costs by 10x overnight. Without alerts and limits, these surprises destroy margins.'
                  : 'Um único usuário pesado pode aumentar seus custos 10x durante a noite. Sem alertas e limites, essas surpresas destroem as margens.',
                severity: 'high'
              },
              {
                id: 'multi-provider',
                title: locale === 'en' ? 'Multi-Provider Chaos' : 'Caos Multi-Provedor',
                description: locale === 'en'
                  ? 'Managing bills from OpenAI, Anthropic, Groq, and others is a nightmare. No unified view, no consolidated reporting.'
                  : 'Gerenciar contas de OpenAI, Anthropic, Groq e outros é um pesadelo. Nenhuma visão unificada, nenhum relatório consolidado.',
                severity: 'medium'
              }
            ]}
            alertMessage={{
              title: locale === 'en' ? 'The Margin Killer' : 'O Matador de Margens',
              description: locale === 'en'
                ? 'You can\'t optimize what you can\'t see. Most AI SaaS companies discover they\'re losing money on their top customers only when it\'s too late.'
                : 'Você não pode otimizar o que não pode ver. A maioria das empresas de IA SaaS descobre que está perdendo dinheiro nos melhores clientes apenas quando é tarde demais.'
            }}
          />
        </div>
      </section>

      {/* Commit 22: Services Section */}
      <section id="services" className="px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              {locale === 'en' ? 'Billing Infrastructure Services' : 'Serviços de Infraestrutura de Cobrança'}
            </h2>
            <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
              {locale === 'en'
                ? 'Fixed-scope, fixed-price services. 2-week delivery. Production-ready code.'
                : 'Serviços de escopo fixo, preço fixo. Entrega em 2 semanas. Código pronto para produção.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Payment Recovery */}
            <Card className="border-zinc-800 bg-zinc-900 hover:border-indigo-500/50 transition-all hover:shadow-lg hover:shadow-indigo-500/10">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <Badge variant="secondary" className="shrink-0">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    {locale === 'en' ? 'Revenue' : 'Receita'}
                  </Badge>
                </div>
                <CardTitle className="text-xl mt-4">
                  {t("services.payment_recovery.title")}
                </CardTitle>
                <div className="text-2xl font-bold text-indigo-400">
                  {t("services.payment_recovery.price")}
                </div>
                <CardDescription className="text-sm">
                  {t("services.payment_recovery.timeline")}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-zinc-300">
                  {t("services.payment_recovery.description")}
                </p>
                <Button asChild className="w-full" variant="outline">
                  <Link href={`/${locale}/services/payment-recovery`}>
                    {locale === 'en' ? 'Learn More' : 'Saiba Mais'}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Usage-Based Pricing */}
            <Card className="border-zinc-800 bg-zinc-900 hover:border-indigo-500/50 transition-all hover:shadow-lg hover:shadow-indigo-500/10">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <Badge variant="secondary" className="shrink-0">
                    <Zap className="h-3 w-3 mr-1" />
                    {locale === 'en' ? 'Growth' : 'Crescimento'}
                  </Badge>
                </div>
                <CardTitle className="text-xl mt-4">
                  {t("services.usage_pricing.title")}
                </CardTitle>
                <div className="text-2xl font-bold text-indigo-400">
                  {t("services.usage_pricing.price")}
                </div>
                <CardDescription className="text-sm">
                  {t("services.usage_pricing.timeline")}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-zinc-300">
                  {t("services.usage_pricing.description")}
                </p>
                <Button asChild className="w-full" variant="outline">
                  <Link href={`/${locale}/services/usage-pricing`}>
                    {locale === 'en' ? 'Learn More' : 'Saiba Mais'}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* AI Cost Tracking */}
            <Card className="border-zinc-800 bg-zinc-900 hover:border-indigo-500/50 transition-all hover:shadow-lg hover:shadow-indigo-500/10">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <Badge variant="default" className="shrink-0">
                    <Database className="h-3 w-3 mr-1" />
                    {locale === 'en' ? 'Core' : 'Núcleo'}
                  </Badge>
                </div>
                <CardTitle className="text-xl mt-4">
                  {t("services.ai_tracking.title")}
                </CardTitle>
                <div className="text-2xl font-bold text-indigo-400">
                  {t("services.ai_tracking.price")}
                </div>
                <CardDescription className="text-sm">
                  {t("services.ai_tracking.timeline")}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-zinc-300">
                  {t("services.ai_tracking.description")}
                </p>
                <Button asChild className="w-full" variant="outline">
                  <Link href={`/${locale}/services/ai-tracking`}>
                    {locale === 'en' ? 'Learn More' : 'Saiba Mais'}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Billing Audit */}
            <Card className="border-zinc-800 bg-zinc-900 hover:border-indigo-500/50 transition-all hover:shadow-lg hover:shadow-indigo-500/10">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <Badge variant="secondary" className="shrink-0">
                    <Shield className="h-3 w-3 mr-1" />
                    {locale === 'en' ? 'Audit' : 'Auditoria'}
                  </Badge>
                </div>
                <CardTitle className="text-xl mt-4">
                  {t("services.billing_audit.title")}
                </CardTitle>
                <div className="text-2xl font-bold text-indigo-400">
                  {t("services.billing_audit.price")}
                </div>
                <CardDescription className="text-sm">
                  {t("services.billing_audit.timeline")}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-zinc-300">
                  {t("services.billing_audit.description")}
                </p>
                <Button asChild className="w-full" variant="outline">
                  <Link href={`/${locale}/services/billing-audit`}>
                    {locale === 'en' ? 'Learn More' : 'Saiba Mais'}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Complete Billing - Featured */}
            <Card className="md:col-span-2 border-indigo-500/50 bg-gradient-to-br from-indigo-950/50 to-zinc-900 hover:border-indigo-500 transition-all hover:shadow-xl hover:shadow-indigo-500/20">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <Badge variant="default" className="shrink-0">
                    <Code2 className="h-3 w-3 mr-1" />
                    {locale === 'en' ? 'Complete' : 'Completo'}
                  </Badge>
                  <Badge variant="outline" className="shrink-0">
                    {locale === 'en' ? 'Best Value' : 'Melhor Valor'}
                  </Badge>
                </div>
                <CardTitle className="text-2xl mt-4">
                  {t("services.complete_billing.title")}
                </CardTitle>
                <div className="text-3xl font-bold text-indigo-400">
                  {t("services.complete_billing.price")}
                </div>
                <CardDescription className="text-sm">
                  {t("services.complete_billing.timeline")}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-zinc-300">
                  {t("services.complete_billing.description")}
                </p>
                <div className="flex flex-wrap gap-4 text-sm text-zinc-400">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    {locale === 'en' ? 'All services included' : 'Todos os serviços incluídos'}
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    {locale === 'en' ? '90-day warranty' : 'Garantia de 90 dias'}
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    {locale === 'en' ? 'Priority support' : 'Suporte prioritário'}
                  </span>
                </div>
                <Button asChild className="w-full" size="lg">
                  <Link href={`/${locale}/services/complete-billing`}>
                    {locale === 'en' ? 'Get Started' : 'Começar Agora'}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Commit 22: Process Section */}
      <section id="process" className="px-6 py-24 lg:px-8 bg-zinc-900/30">
        <div className="mx-auto max-w-6xl">
          <DeliverablesSection
            locale={locale}
            title={locale === 'en' ? 'How We Work' : 'Como Trabalhamos'}
            subtitle={locale === 'en'
              ? 'Transparent process, clear deliverables, fixed pricing. No surprises.'
              : 'Processo transparente, entregas claras, preços fixos. Sem surpresas.'}
            phases={[
              {
                phase: '1',
                title: locale === 'en' ? 'Discovery & Audit' : 'Descoberta e Auditoria',
                duration: locale === 'en' ? 'Week 1' : 'Semana 1',
                price: locale === 'en' ? 0 : 0,
                description: locale === 'en'
                  ? 'We analyze your current billing setup and identify improvement opportunities.'
                  : 'Analisamos sua configuração de cobrança atual e identificamos oportunidades de melhoria.',
                deliverables: [
                  {
                    id: 'd1',
                    title: locale === 'en' ? 'Billing Audit' : 'Auditoria de Cobrança',
                    description: locale === 'en'
                      ? 'Comprehensive analysis of your current billing infrastructure'
                      : 'Análise abrangente da sua infraestrutura de cobrança atual',
                    status: 'pending',
                    deliveryWeek: locale === 'en' ? 'Day 1-3' : 'Dia 1-3'
                  },
                  {
                    id: 'd2',
                    title: locale === 'en' ? 'Cost Analysis' : 'Análise de Custos',
                    description: locale === 'en'
                      ? 'AI cost breakdown with recommendations for optimization'
                      : 'Detalhamento de custos de IA com recomendações de otimização',
                    status: 'pending',
                    deliveryWeek: locale === 'en' ? 'Day 4-5' : 'Dia 4-5'
                  },
                  {
                    id: 'd3',
                    title: locale === 'en' ? 'Implementation Plan' : 'Plano de Implementação',
                    description: locale === 'en'
                      ? 'Detailed roadmap with timeline and pricing'
                      : 'Roadmap detalhado com cronograma e preços',
                    status: 'pending',
                    deliveryWeek: locale === 'en' ? 'Day 5' : 'Dia 5'
                  }
                ]
              },
              {
                phase: '2',
                title: locale === 'en' ? 'Foundation' : 'Fundação',
                duration: locale === 'en' ? 'Week 2' : 'Semana 2',
                price: locale === 'en' ? 3000 : 3000,
                description: locale === 'en'
                  ? 'We build the core billing infrastructure tailored to your needs.'
                  : 'Construímos a infraestrutura de cobrança principal personalizada para suas necessidades.',
                deliverables: [
                  {
                    id: 'd4',
                    title: locale === 'en' ? 'Core Implementation' : 'Implementação Principal',
                    description: locale === 'en'
                      ? 'Billing system setup based on selected service package'
                      : 'Configuração do sistema de cobrança baseado no pacote de serviço selecionado',
                    status: 'pending',
                    deliveryWeek: locale === 'en' ? 'Day 1-7' : 'Dia 1-7'
                  },
                  {
                    id: 'd5',
                    title: locale === 'en' ? 'Integration' : 'Integração',
                    description: locale === 'en'
                      ? 'Connect with your existing systems and providers'
                      : 'Conecte-se com seus sistemas e provedores existentes',
                    status: 'pending',
                    deliveryWeek: locale === 'en' ? 'Day 8-10' : 'Dia 8-10'
                  }
                ]
              },
              {
                phase: '3',
                title: locale === 'en' ? 'Launch & Optimize' : 'Lançamento e Otimização',
                duration: locale === 'en' ? 'Weeks 3-4' : 'Semanas 3-4',
                price: locale === 'en' ? 2000 : 2000,
                description: locale === 'en'
                  ? 'We deploy, test, and optimize your new billing infrastructure.'
                  : 'Implantamos, testamos e otimizamos sua nova infraestrutura de cobrança.',
                deliverables: [
                  {
                    id: 'd6',
                    title: locale === 'en' ? 'Testing & QA' : 'Testes e QA',
                    description: locale === 'en'
                      ? 'Comprehensive testing of all billing flows'
                      : 'Testes abrangentes de todos os fluxos de cobrança',
                    status: 'pending',
                    deliveryWeek: locale === 'en' ? 'Day 1-3' : 'Dia 1-3'
                  },
                  {
                    id: 'd7',
                    title: locale === 'en' ? 'Deployment' : 'Implantação',
                    description: locale === 'en'
                      ? 'Production deployment with monitoring setup'
                      : 'Implantação em produção com configuração de monitoramento',
                    status: 'pending',
                    deliveryWeek: locale === 'en' ? 'Day 4-5' : 'Dia 4-5'
                  },
                  {
                    id: 'd8',
                    title: locale === 'en' ? 'Handover & Training' : 'Entrega e Treinamento',
                    description: locale === 'en'
                      ? 'Documentation, team training, and ongoing support'
                      : 'Documentação, treinamento da equipe e suporte contínuo',
                    status: 'pending',
                    deliveryWeek: locale === 'en' ? 'Day 6-10' : 'Dia 6-10'
                  }
                ]
              }
            ]}
            totalPrice={locale === 'en' ? 5000 : 5000}
            cta={{
              label: locale === 'en' ? 'Start Your Project' : 'Iniciar Seu Projeto',
              href: '#contact'
            }}
          />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            {locale === 'en' ? 'Built by a Billing Specialist' : 'Construído por um Especialista em Cobrança'}
          </h2>
          <div className="prose prose-invert max-w-none">
            <p className="text-lg text-zinc-400 mb-6">
              {locale === 'en'
                ? "I built Margin, a production LLM metering platform, and extracted production billing code from QuoteKit. Now I help AI SaaS companies solve the same problems I've already solved."
                : "Construí Margin, uma plataforma de medição de LLM de produção, e extraí código de cobrança de produção do QuoteKit. Agora ajudo empresas de IA SaaS a resolver os mesmos problemas que já resolvi."}
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-zinc-500">
              <Badge variant="outline" className="gap-2">
                <Code2 className="h-3 w-3" />
                {locale === 'en' ? 'Open Source Contributor' : 'Contribuidor Open Source'}
              </Badge>
              <Badge variant="outline" className="gap-2">
                <Shield className="h-3 w-3" />
                {locale === 'en' ? 'Production Experience' : 'Experiência em Produção'}
              </Badge>
              <Badge variant="outline" className="gap-2">
                <DollarSign className="h-3 w-3" />
                {locale === 'en' ? 'Billing Expert' : 'Especialista em Cobrança'}
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Commit 23: Simplified Contact Form */}
      <section id="contact" className="px-6 py-24 lg:px-8 bg-zinc-900/30">
        <div className="mx-auto max-w-2xl">
          <SimplifiedContactForm
            locale={locale}
            contextText={locale === 'en' ? 'Start with an audit or book a call' : 'Comece com uma auditoria ou agende uma chamada'}
            description={locale === 'en'
              ? 'Tell me about your billing challenges. I\'ll respond within 24 hours with a clear path forward.'
              : 'Conte-me sobre seus desafios de cobrança. Responderei em até 24 horas com um caminho claro.'}
            emailAddress="hello@ai-rio.com"
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 border-t border-zinc-800">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-zinc-500">
              © 2026 AI.RIO - {locale === 'pt' ? 'Todos os direitos reservados.' : locale === 'es' ? 'Todos los derechos reservados.' : 'All rights reserved.'}
            </p>
            <div className="flex items-center gap-6 text-sm text-zinc-500">
              <a href={`/${locale}/privacy`} className="hover:text-zinc-400 transition-colors">
                {locale === 'en' ? 'Privacy' : 'Privacidade'}
              </a>
              <a href={`/${locale}/terms`} className="hover:text-zinc-400 transition-colors">
                {locale === 'en' ? 'Terms' : 'Termos'}
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
