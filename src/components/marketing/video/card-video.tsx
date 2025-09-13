'use client'
import { cn } from "@/lib/utils";
import Link from "next/link";
import { OptimizedImage } from '@/components/ui/optimized-image';
import { VideoIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

interface ProjectItem {
    title: string;
    description: string;
    link: string;
    image: string;
    imageDark?: string;
    imageLight?: string;
    date: string;
    author: string;
}

interface HoverEffectProps {
    items: ProjectItem[];
    className?: string;
}

export const HoverEffect = ({ items, className }: HoverEffectProps) => {
    const { resolvedTheme } = useTheme();
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const getImageSrc = (item: ProjectItem) => {
        if (resolvedTheme === 'dark' && item.imageDark) {
            return item.imageDark;
        } else if (resolvedTheme === 'light' && item.imageLight) {
            return item.imageLight;
        }
        return item.image;
    };

    return (
        <div
            className={cn(
                "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-10",
                className
            )}
        >
            {items.map((item, idx) => (
                <Link
                    href={item?.link.startsWith('http') ? item.link : `/project/${item?.link}`}
                    target={item?.link.startsWith('http') ? '_blank' : undefined}
                    rel={item?.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                    key={item?.link}
                    className="relative group block p-2 h-full w-full"
                    onMouseEnter={() => setHoveredIndex(idx)}
                    onMouseLeave={() => setHoveredIndex(null)}
                >
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
                        <div className="h-64 md:h-48 relative w-full overflow-hidden rounded-md">
                            
                            <OptimizedImage
                                src={getImageSrc(item)}
                                alt={item.title}
                                fill
                                className="object-cover w-full h-full"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                style={{ objectFit: 'cover', objectPosition: 'center' }}
                            />
                        </div>
                        <CardTitle>{item.title}</CardTitle>
                        <CardDescription>{item.description}</CardDescription>
                    </Card>
                </Link>
            ))}
        </div>
    );
};

export const Card = ({
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
};

export const CardTitle = ({
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
};

export const CardDescription = ({
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
};

export default HoverEffect;