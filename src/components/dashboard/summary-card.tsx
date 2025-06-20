import type { SummaryData } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown } from 'lucide-react';

export function SummaryCard({ title, value, icon: Icon, change, changeType, bgColorClass, textColorClass, iconColorClass }: SummaryData) {
  return (
    <Card className={cn("shadow-lg hover:shadow-xl transition-shadow duration-300", bgColorClass)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className={cn("text-sm font-medium", textColorClass)}>{title}</CardTitle>
        <Icon className={cn("h-5 w-5 text-muted-foreground", iconColorClass)} />
      </CardHeader>
      <CardContent>
        <div className={cn("text-2xl font-bold", textColorClass)}>{value}</div>
        {change && (
          <p className={cn("text-xs mt-1 flex items-center", changeType === 'positive' ? 'text-green-600' : 'text-red-600', textColorClass ? (changeType === 'positive' ? 'text-green-300' : 'text-red-300') : '')}>
            {changeType === 'positive' ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
            {change}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
