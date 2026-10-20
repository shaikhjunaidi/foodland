import React, { useState } from 'react';
import { ReservationFormData, ReservationSubmissionState } from '../../types/restaurant';
import { Calendar, Clock, Users, Phone, User, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';

export const ReservationSection: React.FC = () => {
  const [formData, setFormData] = useState<ReservationFormData>({
    customerName: '',
    reservationDate: '',
    preferredTime: '',
    numberOfGuests: 2,
    phoneNumber: '',
    specialRequests: ''
  });

  const [formErrors, setFormErrors] = useState<Partial<Record<keyof ReservationFormData, string>>>({});
  const [submissionState, setSubmissionState] = useState<ReservationSubmissionState>({
    status: 'idle'
  });

  // Basic validation rules
  const validateForm = (): boolean => {
    const errors: Partial<Record<keyof ReservationFormData, string>> = {};

    if (!formData.customerName.trim()) {
      errors.customerName = 'Please enter your full name.';
    } else if (formData.customerName.trim().length < 2) {
      errors.customerName = 'Name must be at least 2 characters.';
    }

    if (!formData.reservationDate) {
      errors.reservationDate = 'Please select a reservation date.';
    }

    if (!formData.preferredTime) {
      errors.preferredTime = 'Please select your preferred time.';
    }

    if (!formData.numberOfGuests || formData.numberOfGuests < 1 || formData.numberOfGuests > 25) {
      errors.numberOfGuests = 'Please select number of guests (1–25).';
    }

    // Phone validation (accepts Indian standard 10-digit formats with optional +91 or spaces)
    const phoneClean = formData.phoneNumber.replace(/[\s-]/g, '');
    const phoneRegex = /^(\+91)?[6-9]\d{9}$/;
    if (!formData.phoneNumber.trim()) {
      errors.phoneNumber = 'Please provide your contact phone number.';
    } else if (!phoneRegex.test(phoneClean)) {
      errors.phoneNumber = 'Please enter a valid 10-digit mobile number (e.g. 9876543210).';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmissionState({ status: 'submitting' });
    const refId = `FL-PREVIEW-${Math.floor(100000 + Math.random() * 900000)}`;

    setTimeout(() => {
      setSubmissionState({
        status: 'success',
        referenceId: refId,
        message: 'Preview reservation request validated. In production, this connects to Food Land’s official table management line once confirmed by the owner.',
        submittedData: { ...formData }
      });
    }, 600);
  };

  const handleReset = () => {
    setFormData({
      customerName: '',
      reservationDate: '',
      preferredTime: '',
      numberOfGuests: 2,
      phoneNumber: '',
      specialRequests: ''
    });
    setFormErrors({});
    setSubmissionState({ status: 'idle' });
  };

  return (
    <section id="reservation" className="py-28 px-6 bg-[#0A0A0C] border-t border-[#D6A75D]/10 relative">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs text-[#D6A75D] uppercase tracking-[0.2em] font-semibold mb-3">
            <span>Table Reservations</span>
            <span aria-hidden="true">·</span>
            <span>Food Land Koppal</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#FAF8F5] leading-tight text-balance mb-4">
            Request a Table
          </h2>
          <p className="text-sm sm:text-base text-[#BFBAB0] font-light leading-relaxed">
            Reserve your dining experience with us. Please note: this form submits a reservation request; tables are verified and confirmed directly by our team.
          </p>
        </div>

        {/* Card Container */}
        <div className="p-8 sm:p-12 rounded-xl bg-[#121217] border border-[#D6A75D]/25 shadow-2xl relative">
          {submissionState.status === 'success' ? (
            /* Success State */
            <div className="text-center py-8 space-y-6 animate-in fade-in zoom-in-95 duration-300">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#D6A75D]/15 border border-[#D6A75D]/40 flex items-center justify-center text-[#D6A75D]">
                <CheckCircle className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs uppercase tracking-widest text-[#D6A75D] font-mono">
                  Request Ref: {submissionState.referenceId}
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#FAF8F5] mt-1 mb-2">
                  Reservation Request Received
                </h3>
                <p className="text-sm text-[#BFBAB0] max-w-lg mx-auto leading-relaxed">
                  Thank you, <strong className="text-[#FAF8F5]">{submissionState.submittedData?.customerName}</strong>. Our team at Food Land will review our floor seating and contact you at <strong className="text-[#D6A75D]">{submissionState.submittedData?.phoneNumber}</strong> to verify and confirm your booking.
                </p>
              </div>

              {/* Submitted Details Box */}
              <div className="p-5 rounded-lg bg-[#0C0C10] border border-[#22222D] max-w-md mx-auto text-xs text-[#C6C2B6] text-left space-y-2">
                <div className="flex justify-between border-b border-[#1C1C24] pb-2">
                  <span className="text-[#8E8B82]">Date Requested:</span>
                  <span className="font-semibold text-[#FAF8F5]">{submissionState.submittedData?.reservationDate}</span>
                </div>
                <div className="flex justify-between border-b border-[#1C1C24] pb-2">
                  <span className="text-[#8E8B82]">Preferred Time:</span>
                  <span className="font-semibold text-[#FAF8F5]">{submissionState.submittedData?.preferredTime}</span>
                </div>
                <div className="flex justify-between border-b border-[#1C1C24] pb-2">
                  <span className="text-[#8E8B82]">Party Size:</span>
                  <span className="font-semibold text-[#FAF8F5]">{submissionState.submittedData?.numberOfGuests} Guests</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8E8B82]">Cuisine Discipline:</span>
                  <span className="font-semibold text-[#D6A75D]">100% Pure Vegetarian</span>
                </div>
              </div>

              {/* Clarification banner */}
              <div className="p-3.5 rounded-md bg-[#161620] border border-[#D6A75D]/15 max-w-md mx-auto text-[11px] text-[#A6A296]">
                Notice: A reservation is only confirmed once you receive confirmation directly from Food Land restaurant management.
              </div>

              <div>
                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#0A0A0C] bg-[#D6A75D] hover:bg-[#E2BA77] rounded transition-colors cursor-pointer"
                >
                  Submit Another Request
                </button>
              </div>
            </div>
          ) : (
            /* Form State */
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Field 1: Customer Name */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#C6C2B6] mb-2 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#D6A75D]" />
                  <span>Customer Full Name *</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Ramesh Kulkarni"
                  value={formData.customerName}
                  onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                  className={`w-full px-4 py-3 bg-[#0A0A0E] border rounded-md text-sm text-[#FAF8F5] placeholder-[#555562] focus:outline-none focus:ring-1 focus:ring-[#D6A75D] transition-all ${
                    formErrors.customerName ? 'border-red-500/80' : 'border-[#282834] focus:border-[#D6A75D]'
                  }`}
                />
                {formErrors.customerName && (
                  <p className="text-xs text-red-400 mt-1.5 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{formErrors.customerName}</span>
                  </p>
                )}
              </div>

              {/* 2-Column Grid: Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Field 2: Reservation Date */}
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#C6C2B6] mb-2 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#D6A75D]" />
                    <span>Reservation Date *</span>
                  </label>
                  <input
                    type="date"
                    value={formData.reservationDate}
                    onChange={(e) => setFormData({ ...formData, reservationDate: e.target.value })}
                    className={`w-full px-4 py-3 bg-[#0A0A0E] border rounded-md text-sm text-[#FAF8F5] focus:outline-none focus:ring-1 focus:ring-[#D6A75D] transition-all ${
                      formErrors.reservationDate ? 'border-red-500/80' : 'border-[#282834] focus:border-[#D6A75D]'
                    }`}
                  />
                  {formErrors.reservationDate && (
                    <p className="text-xs text-red-400 mt-1.5 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{formErrors.reservationDate}</span>
                    </p>
                  )}
                </div>

                {/* Field 3: Preferred Time */}
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#C6C2B6] mb-2 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#D6A75D]" />
                    <span>Preferred Dining Time *</span>
                  </label>
                  <input
                    type="time"
                    value={formData.preferredTime}
                    onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                    className={`w-full px-4 py-3 bg-[#0A0A0E] border rounded-md text-sm text-[#FAF8F5] focus:outline-none focus:ring-1 focus:ring-[#D6A75D] transition-all ${
                      formErrors.preferredTime ? 'border-red-500/80' : 'border-[#282834] focus:border-[#D6A75D]'
                    }`}
                  />
                  {formErrors.preferredTime && (
                    <p className="text-xs text-red-400 mt-1.5 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{formErrors.preferredTime}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* 2-Column Grid: Number of Guests & Phone Number */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Field 4: Number of Guests */}
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#C6C2B6] mb-2 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-[#D6A75D]" />
                    <span>Number of Guests *</span>
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="25"
                    value={formData.numberOfGuests}
                    onChange={(e) => setFormData({ ...formData, numberOfGuests: parseInt(e.target.value) || 1 })}
                    className={`w-full px-4 py-3 bg-[#0A0A0E] border rounded-md text-sm text-[#FAF8F5] focus:outline-none focus:ring-1 focus:ring-[#D6A75D] transition-all ${
                      formErrors.numberOfGuests ? 'border-red-500/80' : 'border-[#282834] focus:border-[#D6A75D]'
                    }`}
                  />
                  {formErrors.numberOfGuests && (
                    <p className="text-xs text-red-400 mt-1.5 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{formErrors.numberOfGuests}</span>
                    </p>
                  )}
                </div>

                {/* Field 5: Phone Number */}
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#C6C2B6] mb-2 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#D6A75D]" />
                    <span>Phone Number *</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="e.g. 9845012345"
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                    className={`w-full px-4 py-3 bg-[#0A0A0E] border rounded-md text-sm text-[#FAF8F5] placeholder-[#555562] focus:outline-none focus:ring-1 focus:ring-[#D6A75D] transition-all ${
                      formErrors.phoneNumber ? 'border-red-500/80' : 'border-[#282834] focus:border-[#D6A75D]'
                    }`}
                  />
                  {formErrors.phoneNumber && (
                    <p className="text-xs text-red-400 mt-1.5 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{formErrors.phoneNumber}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Optional Special Requests */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#C6C2B6] mb-2">
                  Special Dining Requests (Optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. Jain preparation preference, high chair for child, quiet anniversary corner..."
                  value={formData.specialRequests}
                  onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                  className="w-full px-4 py-3 bg-[#0A0A0E] border border-[#282834] rounded-md text-sm text-[#FAF8F5] placeholder-[#555562] focus:outline-none focus:ring-1 focus:ring-[#D6A75D] focus:border-[#D6A75D] transition-all resize-none"
                />
              </div>

              {/* Clarification Notice */}
              <div className="p-4 rounded-lg bg-[#0C0C10] border border-[#22222D] text-xs text-[#8E8B82] leading-relaxed">
                <span className="text-[#D6A75D] font-semibold">Important Policy:</span> Submitting this form creates a reservation request. Our management will verify table allocation and phone you to finalize confirmation. We never invent seating capacity or automated instant table locks.
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submissionState.status === 'submitting'}
                  className="w-full py-3.5 px-6 text-sm font-semibold tracking-wider uppercase text-[#0A0A0C] bg-[#D6A75D] hover:bg-[#E2BA77] disabled:opacity-50 disabled:cursor-not-allowed rounded-md transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  {submissionState.status === 'submitting' ? (
                    <span>Submitting Reservation Request...</span>
                  ) : (
                    <>
                      <span>Submit Table Reservation Request</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
