import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface CalendarCell {
  date: string;
  dayNumber: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  isDisabled: boolean;
}

type TimePeriod = 'AM' | 'PM';
type TimePickerMode = 'hour' | 'minute';

@Component({
  selector: 'app-renter-pickup-date-picker',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './renter-pickup-date-picker.component.html',
  styleUrls: ['./renter-pickup-date-picker.component.scss']
})
export class RenterPickupDatePickerComponent implements OnChanges {
  @Input() value = '';
  @Input() pickupTime = '';
  @Input() minDate = '';
  @Input() disabled = false;

  @Output() valueChange = new EventEmitter<string>();
  @Output() pickupTimeChange = new EventEmitter<string>();

  isOpen = false;
  isTimePickerOpen = false;

  draftDate = '';
  draftTime = '09:00';
  activeMonthDate = this.getTodayDate();

  timePickerMode: TimePickerMode = 'hour';
  selectedHour12 = 9;
  selectedMinute = 0;
  selectedPeriod: TimePeriod = 'AM';

  readonly weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  readonly hourOptions = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  readonly minuteOptions = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['value'] || changes['minDate']) {
      this.draftDate = this.getValidDateOrMin(this.value);
      this.activeMonthDate = this.parseDate(this.draftDate);
    }

    if (changes['pickupTime']) {
      this.draftTime = this.normalizeTime(this.pickupTime || this.draftTime || '09:00');
      this.syncClockFromDraftTime();
    }
  }

  get pillTitle(): string {
    return this.value
      ? `${this.formatDisplayDate(this.value)}`
      : 'Select Pickup Date';
  }

  get selectedYear(): string {
    return this.draftDate
      ? String(this.parseDate(this.draftDate).getFullYear())
      : String(new Date().getFullYear());
  }

  get selectedDateHeader(): string {
    return this.draftDate ? this.formatLongDate(this.draftDate) : 'Select date';
  }

  get monthLabel(): string {
    return this.activeMonthDate.toLocaleDateString('en-US', { month: 'long' });
  }

  get yearLabel(): string {
    return String(this.activeMonthDate.getFullYear());
  }

  get displayDraftTime(): string {
    return this.formatTimeForDisplay(this.draftTime);
  }

  get clockHandAngle(): number {
    if (this.timePickerMode === 'minute') {
      return this.selectedMinute * 6;
    }

    return (this.selectedHour12 % 12) * 30 + (this.selectedMinute / 60) * 30;
  }

  get clockHandTransform(): string {
    return `rotate(${this.clockHandAngle}deg)`;
  }

  get calendarDays(): CalendarCell[] {
    const year = this.activeMonthDate.getFullYear();
    const month = this.activeMonthDate.getMonth();

    const firstDay = new Date(year, month, 1);
    const startDate = new Date(firstDay);
    startDate.setDate(firstDay.getDate() - firstDay.getDay());

    const today = this.formatDate(this.getTodayDate());
    const effectiveMinDate = this.getEffectiveMinDate();

    return Array.from({ length: 42 }, (_, index): CalendarCell => {
      const current = new Date(startDate);
      current.setDate(startDate.getDate() + index);

      const date = this.formatDate(current);
      const isDisabled = date < effectiveMinDate;

      return {
        date,
        dayNumber: current.getDate(),
        isCurrentMonth: current.getMonth() === month,
        isToday: date === today,
        isSelected: !isDisabled && date === this.draftDate,
        isDisabled
      };
    });
  }

  openPicker(): void {
    if (this.disabled) {
      return;
    }

    this.draftDate = this.getValidDateOrMin(this.value);
    this.draftTime = this.normalizeTime(this.pickupTime || this.draftTime || '09:00');
    this.activeMonthDate = this.parseDate(this.draftDate);
    this.syncClockFromDraftTime();

    this.isOpen = true;
  }

  closePicker(): void {
    this.isOpen = false;
    this.closeTimePicker();
  }

  previousMonth(): void {
    this.activeMonthDate = new Date(
      this.activeMonthDate.getFullYear(),
      this.activeMonthDate.getMonth() - 1,
      1
    );
  }

  nextMonth(): void {
    this.activeMonthDate = new Date(
      this.activeMonthDate.getFullYear(),
      this.activeMonthDate.getMonth() + 1,
      1
    );
  }

  previousYear(): void {
    this.activeMonthDate = new Date(
      this.activeMonthDate.getFullYear() - 1,
      this.activeMonthDate.getMonth(),
      1
    );
  }

  nextYear(): void {
    this.activeMonthDate = new Date(
      this.activeMonthDate.getFullYear() + 1,
      this.activeMonthDate.getMonth(),
      1
    );
  }

  selectDate(day: CalendarCell): void {
    if (day.isDisabled || day.date < this.getEffectiveMinDate()) {
      return;
    }

    this.draftDate = day.date;
  }

  openTimePicker(): void {
    if (this.disabled) {
      return;
    }

    this.syncClockFromDraftTime();
    this.timePickerMode = 'hour';
    this.isTimePickerOpen = true;
  }

  closeTimePicker(): void {
    this.isTimePickerOpen = false;
  }

  setTimePickerMode(mode: TimePickerMode): void {
    this.timePickerMode = mode;
  }

  setPeriod(period: TimePeriod): void {
    this.selectedPeriod = period;
    this.updateDraftTimeFromClock();
  }

  selectHour(hour: number): void {
    this.selectedHour12 = hour;
    this.updateDraftTimeFromClock();
    this.timePickerMode = 'minute';
  }

  selectMinute(minute: number): void {
    this.selectedMinute = minute;
    this.updateDraftTimeFromClock();
  }

  getClockNumberLeft(value: number, mode: TimePickerMode): number {
    const angle = this.getClockNumberAngle(value, mode);
    return 50 + 40 * Math.cos(angle);
  }

  getClockNumberTop(value: number, mode: TimePickerMode): number {
    const angle = this.getClockNumberAngle(value, mode);
    return 50 + 40 * Math.sin(angle);
  }

  isMinuteActive(minute: number): boolean {
    return this.selectedMinute === minute;
  }

  padMinute(value: number): string {
    return String(value).padStart(2, '0');
  }

  confirm(): void {
    if (!this.draftDate) {
      return;
    }

    if (this.draftDate < this.getEffectiveMinDate()) {
      this.draftDate = this.getEffectiveMinDate();
      return;
    }

    this.valueChange.emit(this.draftDate);
    this.pickupTimeChange.emit(this.draftTime);
    this.closePicker();
  }

  private getEffectiveMinDate(): string {
    const today = this.formatDate(this.getTodayDate());

    if (!this.minDate) {
      return today;
    }

    return this.minDate > today ? this.minDate : today;
  }

  private getValidDateOrMin(dateValue: string): string {
    const effectiveMinDate = this.getEffectiveMinDate();

    if (!dateValue) {
      return effectiveMinDate;
    }

    return dateValue < effectiveMinDate ? effectiveMinDate : dateValue;
  }

  private getClockNumberAngle(value: number, mode: TimePickerMode): number {
    const degrees = mode === 'hour'
      ? (value % 12) * 30 - 90
      : value * 6 - 90;

    return degrees * Math.PI / 180;
  }

  private syncClockFromDraftTime(): void {
    const normalized = this.normalizeTime(this.draftTime || '09:00');
    const [hourPart, minutePart] = normalized.split(':').map(Number);

    this.selectedPeriod = hourPart >= 12 ? 'PM' : 'AM';
    this.selectedHour12 = hourPart % 12 || 12;
    this.selectedMinute = minutePart || 0;
    this.draftTime = normalized;
  }

  private updateDraftTimeFromClock(): void {
    let hour = this.selectedHour12 % 12;

    if (this.selectedPeriod === 'PM') {
      hour += 12;
    }

    this.draftTime = `${String(hour).padStart(2, '0')}:${this.padMinute(this.selectedMinute)}`;
  }

  private normalizeTime(value: string): string {
    const rawValue = String(value || '').trim();

    const twelveHourMatch = rawValue.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
    if (twelveHourMatch) {
      const hour12 = Number(twelveHourMatch[1]);
      const minute = Number(twelveHourMatch[2]);
      const period = twelveHourMatch[3].toUpperCase() as TimePeriod;
      let hour = hour12 % 12;

      if (period === 'PM') {
        hour += 12;
      }

      return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
    }

    const twentyFourHourMatch = rawValue.match(/^(\d{1,2}):(\d{2})$/);
    if (twentyFourHourMatch) {
      const hour = Math.min(Math.max(Number(twentyFourHourMatch[1]), 0), 23);
      const minute = Math.min(Math.max(Number(twentyFourHourMatch[2]), 0), 59);

      return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
    }

    return '09:00';
  }

  private formatTimeForDisplay(value: string): string {
    const [hourPart, minutePart] = this.normalizeTime(value).split(':').map(Number);
    const period = hourPart >= 12 ? 'PM' : 'AM';
    const hour12 = hourPart % 12 || 12;

    return `${hour12}:${String(minutePart).padStart(2, '0')} ${period}`;
  }

  private getTodayDate(): Date {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate());
  }

  private parseDate(date: string): Date {
    const [year, month, day] = date.split('-').map(Number);

    if (!year || !month || !day) {
      return this.getTodayDate();
    }

    return new Date(year, month - 1, day);
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  private formatDisplayDate(date: string): string {
    return this.parseDate(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }

  private formatLongDate(date: string): string {
    return this.parseDate(date).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  }
}
