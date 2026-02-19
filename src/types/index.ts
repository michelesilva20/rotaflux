export enum ShipmentStatus {
  PLANNED = 'planned',
  COLLECTED = 'collected',
  IN_TRANSIT = 'in_transit',
  DELIVERED = 'delivered',
  OCCURRENCE = 'occurrence',
}

export enum InvoiceStatus {
  PENDING = 'pending',
  PAID = 'paid',
  OVERDUE = 'overdue',
}

export enum VehicleStatus {
  AVAILABLE = 'available',
  IN_USE = 'in_use',
  MAINTENANCE = 'maintenance',
  INACTIVE = 'inactive',
}

export enum DriverStatus {
  AVAILABLE = 'available',
  ON_ROUTE = 'on_route',
  OFF_DUTY = 'off_duty',
  VACATION = 'vacation',
}

export enum OccurrenceType {
  DELAY = 'delay',
  DAMAGE = 'damage',
  LOSS = 'loss',
  ACCIDENT = 'accident',
  MECHANICAL = 'mechanical',
  OTHER = 'other',
}

export enum Priority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent',
}

export interface Customer {
  id: string;
  name: string;
  document: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  createdAt: string;
}

export interface Supplier {
  id: string;
  name: string;
  type: 'fuel_station' | 'toll' | 'workshop' | 'other';
  document: string;
  phone: string;
  address: string;
  city: string;
  state: string;
}

export interface Route {
  id: string;
  name: string;
  origin: string;
  destination: string;
  distance: number;
  estimatedTime: number;
  tollCost: number;
  stops: RouteStop[];
}

export interface RouteStop {
  id: string;
  location: string;
  sequence: number;
  type: 'pickup' | 'delivery' | 'stop';
}

export interface Vehicle {
  id: string;
  plate: string;
  model: string;
  brand: string;
  year: number;
  type: 'truck' | 'van' | 'trailer' | 'semi_trailer';
  status: VehicleStatus;
  currentKm: number;
  fuelConsumption: number;
  lastMaintenance: string;
  nextMaintenance: string;
}

export interface Driver {
  id: string;
  name: string;
  document: string;
  phone: string;
  email: string;
  licenseNumber: string;
  licenseExpiry: string;
  status: DriverStatus;
  score: number;
  hireDate: string;
  avatar?: string;
}

export interface Shipment {
  id: string;
  code: string;
  customer: Customer;
  origin: string;
  destination: string;
  status: ShipmentStatus;
  priority: Priority;
  vehicle?: Vehicle;
  driver?: Driver;
  estimatedDelivery: string;
  actualDelivery?: string;
  value: number;
  weight: number;
  volume: number;
  notes?: string;
  events: ShipmentEvent[];
  documents: Document[];
  occurrences: Occurrence[];
  createdAt: string;
}

export interface ShipmentEvent {
  id: string;
  type: 'created' | 'status_change' | 'note' | 'document' | 'occurrence';
  description: string;
  timestamp: string;
  user: string;
}

export interface Document {
  id: string;
  name: string;
  type: 'invoice' | 'cte' | 'dacte' | 'mdfe' | 'other';
  url: string;
  uploadedAt: string;
}

export interface Occurrence {
  id: string;
  type: OccurrenceType;
  description: string;
  status: 'open' | 'in_progress' | 'resolved';
  createdAt: string;
  resolvedAt?: string;
}

export interface Invoice {
  id: string;
  number: string;
  customer: Customer;
  shipments: string[];
  value: number;
  status: InvoiceStatus;
  dueDate: string;
  paidAt?: string;
  createdAt: string;
}

export interface Maintenance {
  id: string;
  vehicleId: string;
  type: 'preventive' | 'corrective';
  description: string;
  cost: number;
  km: number;
  date: string;
  supplier?: string;
}

export interface Refueling {
  id: string;
  vehicleId: string;
  driverId: string;
  date: string;
  liters: number;
  pricePerLiter: number;
  totalCost: number;
  km: number;
  station: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'operator';
  avatar?: string;
}

export interface DashboardKPIs {
  onTimeDeliveries: number;
  onTimeDeliveriesChange: number;
  inTransit: number;
  inTransitChange: number;
  delayed: number;
  delayedChange: number;
  openOccurrences: number;
  openOccurrencesChange: number;
  estimatedCost: number;
  estimatedCostChange: number;
  monthRevenue: number;
  monthRevenueChange: number;
}

export interface ChartDataPoint {
  date: string;
  value: number;
  label?: string;
}

export interface CostByCategory {
  category: string;
  value: number;
  color: string;
}
