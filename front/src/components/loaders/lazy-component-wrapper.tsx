import { ReactNode, Suspense } from 'react'
import { CustomAlert } from '@/components/custom-alert/custom-alert.tsx'
import { ErrorBoundary } from '@/components/error-boundary'
import { PageLoader } from '@/components/loaders/page-loader.tsx'

export const LazyComponentWrapper = ({ children }: { children: ReactNode }) => (
    <ErrorBoundary fallback={<CustomAlert />}>
        <Suspense fallback={<PageLoader />}>{children}</Suspense>
    </ErrorBoundary>
)
