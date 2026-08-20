package ru.labelcloud.backend.enquiry;

import java.time.Instant;
import java.util.UUID;

public record AdminEnquiryResponse(
        UUID id,
        String contactName,
        String labelName,
        String email,
        String phone,
        String telegram,
        String comment,
        EnquiryStatus status,
        Instant consentedAt,
        Instant createdAt
) {
    static AdminEnquiryResponse from(Enquiry enquiry) {
        return new AdminEnquiryResponse(
                enquiry.getId(),
                enquiry.getContactName(),
                enquiry.getLabelName(),
                enquiry.getEmail(),
                enquiry.getPhone(),
                enquiry.getTelegram(),
                enquiry.getComment(),
                enquiry.getStatus(),
                enquiry.getConsentedAt(),
                enquiry.getCreatedAt());
    }
}
