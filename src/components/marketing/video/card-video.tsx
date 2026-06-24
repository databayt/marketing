'use client'
import { cn } from "@/lib/utils";
import Link from "next/link";
import { OptimizedImage } from '@/components/ui/optimized-image';
import { useTheme } from "next-themes";
import { AnimatePresence, motion } from "framer-motion";
import { useState, memo, useMemo } from "react";
import '@/styles/liquid-glass.css';

const WebsiteIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" aria-hidden="true">
        <path fill="currentColor" d="M4.616 19q-.691 0-1.153-.462T3 17.384V6.616q0-.691.463-1.153T4.615 5h14.77q.69 0 1.152.463T21 6.616v10.769q0 .69-.463 1.153T19.385 19zm0-1h14.769q.23 0 .423-.192t.192-.424V8H4v9.385q0 .23.192.423t.423.192" />
    </svg>
);

const MobileIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" aria-hidden="true">
        <path fill="currentColor" d="M16.73 2.065H7.27a2.386 2.386 0 0 0-2.24 2.5v14.87a2.386 2.386 0 0 0 2.24 2.5h9.46a2.386 2.386 0 0 0 2.24-2.5V4.565a2.386 2.386 0 0 0-2.24-2.5m1.24 17.37a1.39 1.39 0 0 1-1.24 1.5H7.27a1.39 1.39 0 0 1-1.24-1.5V4.565a1.39 1.39 0 0 1 1.24-1.5H8.8v.51a1 1 0 0 0 1 1h4.4a1 1 0 0 0 1-1v-.51h1.53a1.39 1.39 0 0 1 1.24 1.5Z" />
    </svg>
);

interface ProjectItem {
    title: string;
    description: string;
    link: string;
    mobileLink?: string;
    image: string;
    imageDark?: string;
    imageLight?: string;
    date: string;
    author: string;
}

interface HoverEffectProps {
    items: ProjectItem[];
    className?: string;
    websiteLabel?: string;
    mobileLabel?: string;
}

export const HoverEffect = memo(({ items, className, websiteLabel = "Website", mobileLabel = "Mobile" }: HoverEffectProps) => {
    const { resolvedTheme } = useTheme();
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const getImageSrc = useMemo(() => (item: ProjectItem) => {
        if (resolvedTheme === 'dark' && item.imageDark) {
            return item.imageDark;
        } else if (resolvedTheme === 'light' && item.imageLight) {
            return item.imageLight;
        }
        return item.image;
    }, [resolvedTheme]);

    return (
        <div
            className={cn(
                "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-10 -mx-2",
                className
            )}
        >
            {items.map((item, idx) => {
                const hasDualLinks = Boolean(item.mobileLink);

                const cardContent = (
                    <>
                        <AnimatePresence>
                            {hoveredIndex === idx && (
                                <motion.span
                                    className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-slate-800/[0.8] block rounded-md"
                                    layoutId="hoverBackground"
                                    initial={{ opacity: 0 }}
                                    animate={{
                                        opacity: 1,
                                        transition: { duration: 0.15 },
                                    }}
                                    exit={{
                                        opacity: 0,
                                        transition: { duration: 0.15, delay: 0.2 },
                                    }}
                                />
                            )}
                        </AnimatePresence>
                        <Card>
                            <div className="relative w-full overflow-hidden rounded-md h-64 md:h-48">
                                <OptimizedImage
                                    src={getImageSrc(item)}
                                    alt={item.title}
                                    fill
                                    className="object-cover w-full h-full"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    placeholder="blur"
                                    priority={idx < 3}
                                    style={{ objectFit: 'cover', objectPosition: 'center' }}
                                />
                                {hasDualLinks && (
                                    <div className="absolute bottom-3 start-3 end-3 flex gap-1.5 justify-end z-10">
                                        <a
                                            href={item.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="liquid-glass-button liquid-glass-circle"
                                            aria-label={websiteLabel}
                                            title={websiteLabel}
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <WebsiteIcon />
                                        </a>
                                        <a
                                            href={item.mobileLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="liquid-glass-button liquid-glass-circle"
                                            aria-label={mobileLabel}
                                            title={mobileLabel}
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <MobileIcon />
                                        </a>
                                    </div>
                                )}
                            </div>
                            <CardTitle>{item.title}</CardTitle>
                            <CardDescription>{item.description}</CardDescription>
                        </Card>
                    </>
                );

                if (hasDualLinks) {
                    return (
                        <div
                            key={item.link}
                            className="relative group block p-2 h-full w-full"
                            onMouseEnter={() => setHoveredIndex(idx)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            {cardContent}
                        </div>
                    );
                }

                return (
                    <Link
                        href={item?.link.startsWith('http') ? item.link : `/project/${item?.link}`}
                        target={item?.link.startsWith('http') ? '_blank' : undefined}
                        rel={item?.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                        key={item?.link}
                        className="relative group block p-2 h-full w-full"
                        onMouseEnter={() => setHoveredIndex(idx)}
                        onMouseLeave={() => setHoveredIndex(null)}
                    >
                        {cardContent}
                    </Link>
                );
            })}
        </div>
    );
});

HoverEffect.displayName = 'HoverEffect';

export const Card = memo(({
    className,
    children,
}: {
    className?: string;
    children: React.ReactNode;
}) => {
    return (
        <div
            className={cn(
                "h-full w-full overflow-hidden relative z-20",
                className
            )}
        >
            <div className="relative z-50">
                <div className="space-y-3">{children}</div>
            </div>
        </div>
    );
});

Card.displayName = 'Card';

export const CardTitle = memo(({
    className,
    children,
}: {
    className?: string;
    children: React.ReactNode;
}) => {
    return (
        <h4 className={cn("font-bold tracking-wide text-xl md:text-lg mb-0", className)}>
            {children}
        </h4>
    );
});

CardTitle.displayName = 'CardTitle';

export const CardDescription = memo(({
    className,
    children,
}: {
    className?: string;
    children: React.ReactNode;
}) => {
    return (
        <p className={cn(" font-normal tracking-wide leading-relaxed text-sm", className)}>
            {children}
        </p>
    );
});

CardDescription.displayName = 'CardDescription';

export default HoverEffect;
