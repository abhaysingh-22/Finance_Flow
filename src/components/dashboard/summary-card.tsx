import type { SummaryData } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown } from 'lucide-react';

export function SummaryCard({ title, value, icon: Icon, change, changeType, bgColorClass, textColorClass, iconColorClass }: SummaryData) {
  return (
    <Card className={cn(
      "shadow-lg hover:shadow-xl transition-all duration-300",
      "transform hover:scale-[1.02]",
      "border border-gray-200/50 dark:border-gray-800/50",
      bgColorClass
    )}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className={cn(
          "text-sm sm:text-base font-medium leading-tight",
          "flex items-center gap-2",
          textColorClass
        )}>
          <Icon className={cn("h-4 w-4 sm:h-5 sm:w-5", iconColorClass)} />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className={cn(
          "text-xl sm:text-2xl md:text-3xl font-bold tracking-tight",
          "transition-all duration-300",
          textColorClass
        )}>
          {value}
        </div>
        {change && (
          <p className={cn(
            "text-xs sm:text-sm mt-1 flex items-center gap-1",
            "font-medium transition-colors duration-200",
            changeType === 'positive' 
              ? textColorClass ? 'text-green-300' : 'text-green-600' 
              : textColorClass ? 'text-red-300' : 'text-red-600'
          )}>
            {changeType === 'positive' 
              ? <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4" /> 
              : <TrendingDown className="h-3 w-3 sm:h-4 sm:w-4" />}
            {change}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
