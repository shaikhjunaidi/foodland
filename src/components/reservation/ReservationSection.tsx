import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ReservationFormData, ReservationSubmissionState } from '../../types/restaurant';
import { Calendar, Clock, Users, Phone, User, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';
import { fadeInUp, luxuryEase } from '../../utils/animations';

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

    // Phone validation
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
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={fadeInUp}
          className="text-center max-w-2xl mx-auto mb-14"
        >
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
        </motion.div>

        {/* Card Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, ease: luxuryEase }}
          className="p-8 sm:p-12 rounded-2xl bg-[#121217] border border-[#D6A75D]/25 shadow-2xl relative"
        >
          <AnimatePresence mode="wait">
            {submissionState.status === 'success' ? (
              /* Success State */
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: luxuryEase }}
                className="text-center py-8 space-y-6"
              >
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
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleReset}
                    className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#0A0A0C] bg-[#D6A75D] hover:bg-[#E2BA77] rounded transition-colors cursor-pointer"
                  >
                    Submit Another Request
                  </motion.button>
                </div>
              </motion.div>
            ) : (
              /* Form State */
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                {/* Field 1: Customer Name */}
                <div>
                  <label className="text-xs uppercase tracking-wider font-semibold text-[#C6C2B6] mb-2 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#D6A75D]" />
                    <span>Customer Full Name *</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Ramesh Kulkarni"
                    value={formData.customerName}
                    onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                    className={`w-full px-4 py-3 bg-[#0A0A0E] border rounded-lg text-sm text-[#FAF8F5] placeholder-[#555562] focus:outline-none focus:ring-1 focus:ring-[#D6A75D] transition-all ${
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
                    <label className="text-xs uppercase tracking-wider font-semibold text-[#C6C2B6] mb-2 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#D6A75D]" />
                      <span>Reservation Date *</span>
                    </label>
                    <input
                      type="date"
                      value={formData.reservationDate}
                      onChange={(e) => setFormData({ ...formData, reservationDate: e.target.value })}
                      className={`w-full px-4 py-3 bg-[#0A0A0E] border rounded-lg text-sm text-[#FAF8F5] focus:outline-none focus:ring-1 focus:ring-[#D6A75D] transition-all ${
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
                    <label className="text-xs uppercase tracking-wider font-semibold text-[#C6C2B6] mb-2 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#D6A75D]" />
                      <span>Preferred Time *</span>
                    </label>
                    <select
                      value={formData.preferredTime}
                      onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                      className={`w-full px-4 py-3 bg-[#0A0A0E] border rounded-lg text-sm text-[#FAF8F5] focus:outline-none focus:ring-1 focus:ring-[#D6A75D] transition-all ${
                        formErrors.preferredTime ? 'border-red-500/80' : 'border-[#282834] focus:border-[#D6A75D]'
                      }`}
                    >
                      <option value="">Select Dining Time Slot</option>
                      <optgroup label="Breakfast Slots">
                        <option value="07:30 AM">07:30 AM</option>
                        <option value="08:30 AM">08:30 AM</option>
                        <option value="09:30 AM">09:30 AM</option>
                        <option value="10:30 AM">10:30 AM</option>
                      </optgroup>
                      <optgroup label="Lunch Slots">
                        <option value="12:30 PM">12:30 PM</option>
                        <option value="01:30 PM">01:30 PM</option>
                        <option value="02:30 PM">02:30 PM</option>
                      </optgroup>
                      <optgroup label="Dinner Slots">
                        <option value="07:00 PM">07:00 PM</option>
                        <option value="08:00 PM">08:00 PM</option>
                        <option value="09:00 PM">09:00 PM</option>
                        <option value="10:00 PM">10:00 PM</option>
                      </optgroup>
                    </select>
                    {formErrors.preferredTime && (
                      <p className="text-xs text-red-400 mt-1.5 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{formErrors.preferredTime}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* 2-Column Grid: Guests & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Field 4: Guests */}
                  <div>
                    <label className="text-xs uppercase tracking-wider font-semibold text-[#C6C2B6] mb-2 flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-[#D6A75D]" />
                      <span>Number of Guests *</span>
                    </label>
                    <select
                      value={formData.numberOfGuests}
                      onChange={(e) => setFormData({ ...formData, numberOfGuests: Number(e.target.value) })}
                      className="w-full px-4 py-3 bg-[#0A0A0E] border border-[#282834] focus:border-[#D6A75D] rounded-lg text-sm text-[#FAF8F5] focus:outline-none focus:ring-1 focus:ring-[#D6A75D]"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 15, 20].map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? 'Guest' : 'Guests'}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Field 5: Contact Phone */}
                  <div>
                    <label className="text-xs uppercase tracking-wider font-semibold text-[#C6C2B6] mb-2 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-[#D6A75D]" />
                      <span>Phone Number *</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. 9876543210"
                      value={formData.phoneNumber}
                      onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                      className={`w-full px-4 py-3 bg-[#0A0A0E] border rounded-lg text-sm text-[#FAF8F5] placeholder-[#555562] focus:outline-none focus:ring-1 focus:ring-[#D6A75D] transition-all ${
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

                {/* Field 6: Special Requests */}
                <div>
                  <label className="text-xs uppercase tracking-wider font-semibold text-[#C6C2B6] mb-2 block">
                    Special Seating Requests (Optional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="e.g. Family booth, quiet corner, high chair for child..."
                    value={formData.specialRequests}
                    onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                    className="w-full px-4 py-3 bg-[#0A0A0E] border border-[#282834] focus:border-[#D6A75D] rounded-lg text-sm text-[#FAF8F5] placeholder-[#555562] focus:outline-none focus:ring-1 focus:ring-[#D6A75D]"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={submissionState.status === 'submitting'}
                    className="w-full py-4 text-xs font-semibold tracking-wider uppercase text-[#0A0A0C] bg-[#D6A75D] hover:bg-[#E2BA77] rounded-lg transition-shadow shadow-[0_4px_20px_rgba(214,167,93,0.3)] hover:shadow-[0_6px_28px_rgba(214,167,93,0.45)] cursor-pointer flex items-center justify-center gap-2"
                  >
                    {submissionState.status === 'submitting' ? (
                      <span>Validating Request...</span>
                    ) : (
                      <>
                        <span>Submit Reservation Request</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </motion.button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
