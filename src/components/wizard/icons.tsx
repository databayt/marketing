'use client';

import { cn } from '@/lib/utils';
import { Check, Home, Settings, User, ShoppingCart, Heart, Star, Bell, Search } from 'lucide-react';

type IconSelectorProps = {
  selectedStyle?: string;
  onSelect: (styleId: string) => void;
};

export const IconSelector = ({
  selectedStyle,
  onSelect
}: IconSelectorProps) => {

  const iconStyles = [
    {
      id: 'outlined',
      name: 'Outlined',
      description: 'Clean line icons',
      preview: [
        { Icon: Home, label: 'Home' },
        { Icon: Settings, label: 'Settings' },
        { Icon: User, label: 'User' },
        { Icon: ShoppingCart, label: 'Cart' }
      ]
    },
    {
      id: 'filled',
      name: 'Filled',
      description: 'Solid filled icons',
      preview: [
        { Icon: Heart, label: 'Heart' },
        { Icon: Star, label: 'Star' },
        { Icon: Bell, label: 'Bell' },
        { Icon: Search, label: 'Search' }
      ]
    }
  ];

  return (
    <div className="h-full overflow-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {iconStyles.map((style) => (
          <div
            key={style.id}
            onClick={() => onSelect(style.id)}
            className={cn(
              "relative cursor-pointer group overflow-hidden rounded-lg border-2 transition-all duration-200 p-6",
              selectedStyle === style.id
                ? "border-primary shadow-lg bg-primary/5"
                : "border-muted hover:border-muted-foreground/50 hover:shadow-md bg-background"
            )}
          >
            {/* Selection indicator */}
            {selectedStyle === style.id && (
              <div className="absolute top-3 right-3 z-10 bg-primary text-primary-foreground rounded-full p-1">
                <Check className="w-4 h-4" />
              </div>
            )}

            {/* Style info */}
            <div className="mb-6">
              <h3 className="font-semibold text-xl mb-2">{style.name}</h3>
              <p className="text-sm text-muted-foreground">{style.description}</p>
            </div>

            {/* Icon preview grid */}
            <div className="grid grid-cols-4 gap-4">
              {style.preview.map(({ Icon, label }, index) => (
                <div key={index} className="flex flex-col items-center gap-2">
                  <div className={cn(
                    "p-3 rounded-lg transition-colors",
                    selectedStyle === style.id
                      ? "bg-primary/10"
                      : "bg-muted hover:bg-muted-foreground/10"
                  )}>
                    <Icon
                      className={cn(
                        "w-6 h-6",
                        style.id === 'filled' ? "fill-current" : "",
                        selectedStyle === style.id
                          ? "text-primary"
                          : "text-foreground"
                      )}
                      strokeWidth={style.id === 'outlined' ? 1.5 : 2}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">{label}</span>
                </div>
              ))}
            </div>

            {/* Additional preview row */}
            <div className="mt-6 pt-6 border-t">
              <div className="flex items-center justify-center gap-4">
                {['Home', 'Settings', 'User', 'Bell'].map((item, index) => {
                  const IconComponent = index === 0 ? Home :
                                       index === 1 ? Settings :
                                       index === 2 ? User : Bell;
                  return (
                    <IconComponent
                      key={item}
                      className={cn(
                        "w-5 h-5 transition-colors",
                        style.id === 'filled' ? "fill-current" : "",
                        selectedStyle === style.id
                          ? "text-primary"
                          : "text-muted-foreground"
                      )}
                      strokeWidth={style.id === 'outlined' ? 1.5 : 2}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Icon library examples */}
      <div className="mt-8 p-4 bg-muted/50 rounded-lg">
        <p className="text-sm text-muted-foreground text-center">
          Choose between outlined and filled icon styles for your application.
          This will affect all icons throughout your interface.
        </p>
      </div>
    </div>
  );
};