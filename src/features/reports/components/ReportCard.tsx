import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ReportStatusBadge } from './ReportStatusBadge';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { MapPin, Calendar, Eye } from 'lucide-react';
import type { Report } from '../types/report.types';

interface ReportCardProps {
  report: Report;
  onViewDetails: (report: Report) => void;
}

export function ReportCard({ report, onViewDetails }: ReportCardProps) {
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <Card className="hover:shadow-md transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-gray-900 mb-2">
              {truncateText(report.description, 60)}
            </h3>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(report.ocurrenceDate)}</span>
            </div>
          </div>
          <ReportStatusBadge status={report.status} />
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="w-4 h-4" />
            <span>{report.location}</span>
          </div>
          
          <p className="text-sm text-gray-700 line-clamp-2">
            {truncateText(report.details, 120)}
          </p>
          
          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-gray-500">
              Registrado em {formatDate(report.createdAt)}
            </span>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => onViewDetails(report)}
              className="flex items-center gap-2"
            >
              <Eye className="w-4 h-4" />
              Ver detalhes
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}