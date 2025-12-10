'use client';

import dynamic from 'next/dynamic';

const MarkFlowClient = dynamic(() => import('@/components/markflow/MarkFlowClient'), { ssr: false });

export default function Home() {
  return <MarkFlowClient />;
}
