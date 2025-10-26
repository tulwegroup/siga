'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Search, 
  Filter, 
  Building2, 
  Eye, 
  ChevronDown,
  ArrowUpDown,
  ArrowUp,
  ArrowDown
} from 'lucide-react';

interface Entity {
  id: string;
  entityId: string;
  name: string;
  category: string;
  sector: string;
  parentMinistry: string;
  status: string;
  contactEmail?: string;
  contactPhone?: string;
  website?: string;
  address?: string;
  description?: string;
  establishedDate?: string;
  lastUpdated?: string;
  createdAt?: string;
}

interface EntityTableProps {
  entities: Entity[];
  onEntityClick?: (entity: Entity) => void;
}

type SortField = 'name' | 'category' | 'sector' | 'status' | 'parentMinistry';
type SortDirection = 'asc' | 'desc';

export function EntityTable({ entities, onEntityClick }: EntityTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSector, setSelectedSector] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedMinistry, setSelectedMinistry] = useState<string>('all');
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [showFilters, setShowFilters] = useState(false);

  // Get unique values for filters
  const categories = useMemo(() => {
    const cats = [...new Set(entities.map(e => e.category))];
    return cats.sort();
  }, [entities]);

  const sectors = useMemo(() => {
    const secs = [...new Set(entities.map(e => e.sector))];
    return secs.sort();
  }, [entities]);

  const statuses = useMemo(() => {
    const stats = [...new Set(entities.map(e => e.status))];
    return stats.sort();
  }, [entities]);

  const ministries = useMemo(() => {
    const mins = [...new Set(entities.map(e => e.parentMinistry))];
    return mins.sort();
  }, [entities]);

  // Filter and sort entities
  const filteredAndSortedEntities = useMemo(() => {
    let filtered = entities.filter(entity => {
      const matchesSearch = searchTerm === '' || 
        entity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entity.entityId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entity.sector.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entity.parentMinistry.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory = selectedCategory === 'all' || entity.category === selectedCategory;
      const matchesSector = selectedSector === 'all' || entity.sector === selectedSector;
      const matchesStatus = selectedStatus === 'all' || entity.status === selectedStatus;
      const matchesMinistry = selectedMinistry === 'all' || entity.parentMinistry === selectedMinistry;

      return matchesSearch && matchesCategory && matchesSector && matchesStatus && matchesMinistry;
    });

    // Sort entities
    filtered.sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];

      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = (bValue as string).toLowerCase();
      }

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [entities, searchTerm, selectedCategory, selectedSector, selectedStatus, selectedMinistry, sortField, sortDirection]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'bg-green-500';
      case 'UNDER_RESTRUCTURING': return 'bg-yellow-500';
      case 'INACTIVE': return 'bg-red-500';
      case 'DISSOLVED': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'SOE': return 'bg-blue-500';
      case 'JVC': return 'bg-purple-500';
      case 'OSE': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) {
      return <ArrowUpDown className="h-4 w-4 text-gray-400" />;
    }
    return sortDirection === 'asc' ? 
      <ArrowUp className="h-4 w-4 text-primary" /> : 
      <ArrowDown className="h-4 w-4 text-primary" />;
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedSector('all');
    setSelectedStatus('all');
    setSelectedMinistry('all');
    setSortField('name');
    setSortDirection('asc');
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Entity Registry
            </CardTitle>
            <CardDescription>
              {filteredAndSortedEntities.length} of {entities.length} entities
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
              <ChevronDown className={`h-4 w-4 ml-2 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={clearFilters}
            >
              Clear All
            </Button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search entities by name, ID, sector, or ministry..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t">
            <div>
              <label className="text-sm font-medium mb-2 block">Category</label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="All categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Sector</label>
              <Select value={selectedSector} onValueChange={setSelectedSector}>
                <SelectTrigger>
                  <SelectValue placeholder="All sectors" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sectors</SelectItem>
                  {sectors.map(sector => (
                    <SelectItem key={sector} value={sector}>
                      {sector}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Status</label>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  {statuses.map(status => (
                    <SelectItem key={status} value={status}>
                      {status.replace('_', ' ')}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Ministry</label>
              <Select value={selectedMinistry} onValueChange={setSelectedMinistry}>
                <SelectTrigger>
                  <SelectValue placeholder="All ministries" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Ministries</SelectItem>
                  {ministries.map(ministry => (
                    <SelectItem key={ministry} value={ministry}>
                      {ministry}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
      </CardHeader>

      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSort('name')}
                    className="font-semibold"
                  >
                    Entity Name
                    <SortIcon field="name" />
                  </Button>
                </th>
                <th className="text-left p-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSort('category')}
                    className="font-semibold"
                  >
                    Category
                    <SortIcon field="category" />
                  </Button>
                </th>
                <th className="text-left p-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSort('sector')}
                    className="font-semibold"
                  >
                    Sector
                    <SortIcon field="sector" />
                  </Button>
                </th>
                <th className="text-left p-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSort('parentMinistry')}
                    className="font-semibold"
                  >
                    Ministry
                    <SortIcon field="parentMinistry" />
                  </Button>
                </th>
                <th className="text-left p-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSort('status')}
                    className="font-semibold"
                  >
                    Status
                    <SortIcon field="status" />
                  </Button>
                </th>
                <th className="text-left p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedEntities.map((entity) => (
                <tr 
                  key={entity.id} 
                  className="border-b hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => onEntityClick?.(entity)}
                >
                  <td className="p-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${getStatusColor(entity.status)}`} />
                      <div>
                        <div className="font-medium">{entity.name}</div>
                        <div className="text-sm text-gray-500">{entity.entityId}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-2">
                    <Badge 
                      variant="secondary" 
                      className={`${getCategoryColor(entity.category)} text-white`}
                    >
                      {entity.category}
                    </Badge>
                  </td>
                  <td className="p-2 text-sm">{entity.sector}</td>
                  <td className="p-2 text-sm">{entity.parentMinistry}</td>
                  <td className="p-2">
                    <Badge variant="outline" className="capitalize">
                      {entity.status.replace('_', ' ')}
                    </Badge>
                  </td>
                  <td className="p-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        onEntityClick?.(entity);
                      }}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredAndSortedEntities.length === 0 && (
          <div className="text-center py-8">
            <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No entities found</h3>
            <p className="text-gray-500 mb-4">
              Try adjusting your search or filters to find what you're looking for.
            </p>
            <Button onClick={clearFilters}>Clear Filters</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}