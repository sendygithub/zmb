export interface AdminUser {
  id: string;
  name: string | null;
  email: string;
  role: string;
  createdAt: Date;
}

export interface Schedule {
  id: string;
  title: string;
  description: string | null;
  instructor: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  maxParticipants: number;
  location: string;
  isActive: boolean;
}

export interface Attendance {
  id: string;
  userId: string;
  scheduleId: string;
  date: Date;
  status: string;
  user: AdminUser;
  schedule: Schedule;
}

export interface ScheduleFormData {
  title: string;
  description: string;
  instructor: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  maxParticipants: number;
  location: string;
  isActive: boolean;
}

export const DAY_NAMES = [
  "Minggu",
  "Senin",
  "Selasa",
  "Rabu",
  "Kamis",
  "Jumat",
  "Sabtu",
];

export const EMPTY_SCHEDULE_FORM: ScheduleFormData = {
  title: "",
  description: "",
  instructor: "",
  dayOfWeek: 1,
  startTime: "07:00",
  endTime: "08:00",
  maxParticipants: 30,
  location: "Studio Binong",
  isActive: true,
};
