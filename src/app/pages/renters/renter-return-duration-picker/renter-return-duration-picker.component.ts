import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-renter-return-duration-picker',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './renter-return-duration-picker.component.html',
  styleUrls: ['./renter-return-duration-picker.component.scss']
})
export class RenterReturnDurationPickerComponent implements OnInit {
  /** Pickup date in yyyy-MM-dd format. */
  @Input() pickupDate = '';

  /** Pickup time in HH:mm 24-hour format. Example: 19:39. */
  @Input() pickupTime = '';

  /** Return date in yyyy-MM-dd format. */
  @Input() value = '';

  /** Return time in HH:mm 24-hour format. */
  @Input() returnTime = '';

  @Input() disabled = false;
  @Input() minDays = 1;
  @Input() maxDays = 60;

  @Output() valueChange = new EventEmitter<string>();
  @Output() returnTimeChange = new EventEmitter<string>();
  @Output() durationDaysChange = new EventEmitter<number>();
  @Output() addHalfDayChange = new EventEmitter<boolean>();

  isOpen = false;
  durationDays = 1;
  addHalfDay = false;
  errorMessage = '';

  ngOnInit(): void {
    // Initialize with default values if not set
    if (!this.pickupDate) {
      this.pickupDate = this.formatDateValue(new Date());
    }
    if (!this.value) {
      // Set return date to pickup date + minDays
      const returnDate = new Date(this.parseDateTime(this.pickupDate, this.pickupTime || '12:00'));
      returnDate.setDate(returnDate.getDate() + this.minDays);
      this.value = this.formatDateValue(returnDate);
      this.returnTime = this.formatTimeValue(returnDate);
      
      // Emit the initial values
      this.valueChange.emit(this.value);
      this.returnTimeChange.emit(this.returnTime);
      this.durationDaysChange.emit(this.durationDays);
    }
  }

  openPicker(): void {
    if (this.disabled) {
      return;
    }

    this.errorMessage = '';
    this.syncDurationFromCurrentValue();
    this.isOpen = true;
  }

  closePicker(): void {
    this.isOpen = false;
    this.errorMessage = '';
  }

  decreaseDays(): void {
    this.durationDays = Math.max(this.minDays, this.durationDays - 1);
  }

  increaseDays(): void {
    this.durationDays = Math.min(this.maxDays, this.durationDays + 1);
  }

  setAddHalfDay(value: boolean): void {
    this.addHalfDay = value;
  }

  confirm(): void {
    if (!this.pickupDate) {
      this.errorMessage = 'Please select pick-up date first.';
      return;
    }

    const returnDate = this.computedReturnDate;

    this.valueChange.emit(this.formatDateValue(returnDate));
    this.returnTimeChange.emit(this.formatTimeValue(returnDate));
    this.durationDaysChange.emit(this.durationDays);
    this.addHalfDayChange.emit(this.addHalfDay);
    this.closePicker();
  }

  get displayReturnDate(): string {
    if (!this.value) {
      return this.formatDateDisplay(new Date());
    }

    return this.formatDateDisplay(this.parseDateTime(this.value, this.returnTime || this.pickupTime));
  }

  get displayReturnSubText(): string {
    if (!this.value) {
      return 'Return Date';
    }

    return this.returnTime ? this.formatTimeDisplay(this.returnTime) : 'Return Date';
  }

  get computedReturnDate(): Date {
    const start = this.parseDateTime(
      this.pickupDate || this.value || this.formatDateValue(new Date()),
      this.pickupTime || this.returnTime || '12:00'
    );

    console.log("this.pickupTime: ", this.pickupTime);
    const totalHours = (this.durationDays * 24) + (this.addHalfDay ? 12 : 0);
    return new Date(start.getTime() + totalHours * 60 * 60 * 1000);
  }

  get computedReturnLabel(): string {
    return this.formatDateTimeDisplay(this.computedReturnDate);
  }

  get durationLabel(): string {
    return `${this.durationDays} DAY${this.durationDays > 1 ? 'S' : ''}`;
  }

  get canDecrease(): boolean {
    return this.durationDays > this.minDays;
  }

  get canIncrease(): boolean {
    return this.durationDays < this.maxDays;
  }

  private syncDurationFromCurrentValue(): void {
    if (!this.pickupDate || !this.value) {
      this.durationDays = Math.max(this.minDays, this.durationDays || this.minDays);
      return;
    }

    const pickup = this.parseDateTime(this.pickupDate, this.pickupTime || '12:00');
    const returnDate = this.parseDateTime(this.value, this.returnTime || this.pickupTime || '12:00');
    const diffHours = Math.max(0, Math.round((returnDate.getTime() - pickup.getTime()) / (60 * 60 * 1000)));

    if (diffHours <= 0) {
      this.durationDays = this.minDays;
      this.addHalfDay = false;
      return;
    }

    this.durationDays = Math.min(this.maxDays, Math.max(this.minDays, Math.floor(diffHours / 24)));
    this.addHalfDay = diffHours % 24 >= 12;
  }

  private parseDateTime(dateValue: string, timeValue: string): Date {
    const [year, month, day] = dateValue.split('-').map(Number);
    const [hour, minute] = (timeValue || '12:00').split(':').map(Number);

    return new Date(
      year || new Date().getFullYear(),
      (month || new Date().getMonth() + 1) - 1,
      day || new Date().getDate(),
      hour || 0,
      minute || 0,
      0,
      0
    );
  }

  private formatDateValue(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  private formatTimeValue(date: Date): string {
    const hour = String(date.getHours()).padStart(2, '0');
    const minute = String(date.getMinutes()).padStart(2, '0');
    return `${hour}:${minute}`;
  }

  private formatDateDisplay(date: Date): string {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }

  private formatTimeDisplay(timeValue: string): string {
    const date = this.parseDateTime(this.value || this.pickupDate || this.formatDateValue(new Date()), timeValue);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit'
    });
  }

  private formatDateTimeDisplay(date: Date): string {
    const datePart = date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });

    const timePart = date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit'
    });

    return `${datePart} at ${timePart}`;
  }
}
