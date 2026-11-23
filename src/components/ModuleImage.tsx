import { useState } from 'react';
import { BookOpen, Cpu, ShieldCheck, Code2 } from 'lucide-react';
import { ModuleId } from '../types';

interface ModuleImageProps {
  moduleId: ModuleId;
  src: string;
  alt: string;
  className?: string;
}

export function ModuleImage({ moduleId, src, alt, className = '' }: ModuleImageProps) {
  const [hasError, setHasError] = useState(false);

  const renderFallbackIcon = () => {
    switch (moduleId) {
      case 'dampak-sosial':
        return <BookOpen className="w-8 h-8 text-blue-600 dark:text-blue-400" />;
      case 'computer-system':
        return <Cpu className="w-8 h-8 text-blue-600 dark:text-blue-400" />;
      case 'keamanan-etika':
        return <ShieldCheck className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />;
      case 'vibe-coding':
        return <Code2 className="w-8 h-8 text-blue-600 dark:text-blue-400" />;
    }
  };

  if (hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center gap-2 bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 ${className}`}
      >
        {renderFallbackIcon()}
        <span className="text-xs font-medium px-3 text-center line-clamp-2">{alt}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={`object-cover ${className}`}
    />
  );
}
