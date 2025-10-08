import { useAccessCounter } from '@/hooks/useAccessCounter';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Users, Calendar, TrendingUp, RotateCcw } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface AccessCounterDisplayProps {
  variant?: 'compact' | 'full';
  className?: string;
  showDebug?: boolean;
}

const AccessCounterDisplay = ({ variant = 'compact', className = '', showDebug = false }: AccessCounterDisplayProps) => {
  const { counter, isLoading, resetCounter } = useAccessCounter();

  if (isLoading) {
    return (
      <Card className={`p-4 ${className}`}>
        <div className="flex items-center gap-3">
          <Skeleton className="h-4 w-4 rounded" />
          <Skeleton className="h-4 w-20" />
        </div>
      </Card>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <Eye className="h-4 w-4 text-muted-foreground" />
        <Badge variant="secondary" className="flex items-center gap-1">
          <span className="text-xs">{counter.totalVisits.toLocaleString()} visitas</span>
        </Badge>
      </div>
    );
  }

  return (
    <Card className={`p-6 glass border-border/50 ${className}`}>
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="h-5 w-5 text-primary" />
          <h3 className="font-semibold text-lg">Estatísticas do Site</h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center">
              <Eye className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-primary">
                {counter.totalVisits.toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground">Total de Visitas</p>
            </div>
          </div>

          <div className="text-center space-y-2">
            <div className="flex items-center justify-center">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-primary">
                {counter.uniqueVisits.toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground">Visitantes Únicos</p>
            </div>
          </div>

          <div className="text-center space-y-2">
            <div className="flex items-center justify-center">
              <Calendar className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-primary">
                {counter.todayVisits.toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground">Hoje</p>
            </div>
          </div>

          <div className="text-center space-y-2">
            <div className="flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold text-primary">
                {counter.lastVisit && new Date(counter.lastVisit).toLocaleDateString('pt-BR')}
              </p>
              <p className="text-xs text-muted-foreground">Última Visita</p>
            </div>
          </div>
        </div>

        <div className="pt-2 border-t border-border/50">
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">
              Contador atualizado em tempo real
            </p>
            {showDebug && import.meta.env.DEV && (
              <Button
                variant="ghost"
                size="sm"
                onClick={resetCounter}
                className="text-xs h-6 px-2"
              >
                <RotateCcw className="h-3 w-3 mr-1" />
                Reset
              </Button>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default AccessCounterDisplay;